import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { ShopView } from './shop-view.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/notification.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopsRepository: Repository<Shop>,
    @InjectRepository(ShopView)
    private readonly shopViewRepository: Repository<ShopView>,
    private readonly notificationsService: NotificationsService,
  ) {}

  // 1. Tạo Shop mới - Đã khóa mỗi user chỉ 1 shop
  async create(userId: number, createShopDto: CreateShopDto) {
    try {
      // Kiểm tra xem user này đã có shop chưa
      const existingShop = await this.shopsRepository.findOne({ 
        where: { ownerId: userId } 
      });

      if (existingShop) {
        throw new BadRequestException('Mỗi tài khoản chỉ được phép sở hữu một cửa hàng.');
      }

      const newShop = this.shopsRepository.create({
        ...createShopDto,
        ownerId: userId,
        status: 'pending',
        rating: 0,
      });
      return await this.shopsRepository.save(newShop);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.error('Lỗi khi tạo shop:', error);
      throw new InternalServerErrorException('Không thể tạo cửa hàng, vui lòng thử lại.');
    }
  }

  // 2. Lấy danh sách Shop (Có tính toán động số lượng sản phẩm và rating trung bình)
  async findAll() {
    const shops = await this.shopsRepository.createQueryBuilder('shop')
      .leftJoinAndSelect('shop.products', 'products')
      .leftJoinAndSelect('products.reviews', 'reviews')
      .orderBy('shop.created_at', 'DESC')
      .getMany();

    // Tính toán thống kê cho từng shop
    return shops.map(shop => {
      const productCount = shop.products?.length || 0;
      
      // Tính rating trung bình từ tất cả review của tất cả sản phẩm trong shop
      let totalRating = 0;
      let totalReviews = 0;
      
      shop.products?.forEach(product => {
        product.reviews?.forEach(review => {
          totalRating += Number(review.rating);
          totalReviews++;
        });
      });

      const averageRating = totalReviews > 0 
        ? Number((totalRating / totalReviews).toFixed(1)) 
        : 0;

      // Trả về object sạch không kèm mảng products/reviews quá lớn
      const { products, ...shopInfo } = shop;
      return {
        ...shopInfo,
        productCount,
        rating: averageRating,
        reviewCount: totalReviews
      };
    });
  }

  async findOne(id: number) {
    const shop = await this.shopsRepository.findOne({ where: { id } });
    if (!shop) throw new NotFoundException(`Không tìm thấy shop với ID ${id}`);
    return shop;
  }

  async getShopProfile(id: number) {
    const shop = await this.shopsRepository.findOne({ 
      where: { id },
      relations: ['products', 'products.reviews']
    });
    if (!shop) throw new NotFoundException(`Không tìm thấy shop với ID ${id}`);

    const productCount = shop.products?.length || 0;
    let totalRating = 0;
    let totalReviews = 0;
    
    shop.products?.forEach(product => {
      product.reviews?.forEach(review => {
        totalRating += Number(review.rating);
        totalReviews++;
      });
    });

    const averageRating = totalReviews > 0 
      ? Number((totalRating / totalReviews).toFixed(1)) 
      : 0;

    const { products, ...shopInfo } = shop;
    return {
      ...shopInfo,
      productCount,
      rating: averageRating,
      reviews: totalReviews // map to shop.reviews for Frontend
    };
  }

  async incrementViews(id: number) {
    const shop = await this.findOne(id);
    shop.views = (shop.views || 0) + 1;
    return await this.shopsRepository.save(shop);
  }

  // Ghi nhận 1 lượt xem mới vào bảng shop_views (có timestamp để thống kê theo tháng)
  async trackView(shopId: number, sessionId?: string): Promise<void> {
    const view = this.shopViewRepository.create({ shopId, sessionId });
    await this.shopViewRepository.save(view);
    // Đồng thời cập nhật tổng views trong bảng shops
    await this.shopsRepository.increment({ id: shopId }, 'views', 1);
  }

  // Lấy thống kê lượt xem theo từng tháng trong năm hiện tại
  async getMonthlyViewStats(shopId: number, year?: number): Promise<{ month: number; views: number }[]> {
    const targetYear = year || new Date().getFullYear();
    const rows = await this.shopViewRepository
      .createQueryBuilder('v')
      .select('EXTRACT(MONTH FROM v."createdAt")', 'month')
      .addSelect('COUNT(v.id)', 'views')
      .where('v."shopId" = :shopId', { shopId })
      .andWhere('EXTRACT(YEAR FROM v."createdAt") = :year', { year: targetYear })
      .groupBy('EXTRACT(MONTH FROM v."createdAt")')
      .orderBy('month', 'ASC')
      .getRawMany();

    // Điền 0 cho các tháng chưa có
    const result = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      views: 0,
    }));
    rows.forEach(r => {
      const idx = parseInt(r.month) - 1;
      if (idx >= 0 && idx < 12) result[idx].views = parseInt(r.views) || 0;
    });
    return result;
  }

  async findByUserId(userId: number) {
    return await this.shopsRepository.findOne({ 
      where: { ownerId: userId }
    });
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    const shop = await this.findOne(id);
    Object.assign(shop, updateShopDto);
    return await this.shopsRepository.save(shop);
  }

  async remove(id: number) {
    const shop = await this.findOne(id);
    return await this.shopsRepository.remove(shop);
  }

  async findPending() {
    return await this.shopsRepository.find({ where: { status: 'pending' } });
  }

  async approve(id: number) {
    const shop = await this.findOne(id);
    shop.status = 'approved';
    const savedShop = await this.shopsRepository.save(shop);
    
    // Gửi thông báo cho chủ shop
    await this.notificationsService.create({
      userId: shop.ownerId,
      message: `Chúc mừng! Cửa hàng "${shop.shop_name}" của bạn đã được phê duyệt thành công.`,
      type: NotificationType.SUCCESS,
    });
    
    return savedShop;
  }

  // FIX: Thay vì đổi status thành rejected, ta xóa luôn khỏi DB 
  // NHƯNG gửi thông báo trước khi xóa
  async reject(id: number) {
    const shop = await this.findOne(id);
    
    // Gửi thông báo cho chủ shop trước khi xóa
    await this.notificationsService.create({
      userId: shop.ownerId,
      message: `Rất tiếc! Đơn đăng ký cửa hàng "${shop.shop_name}" của bạn đã bị từ chối.`,
      type: NotificationType.ERROR,
    });
    
    return await this.shopsRepository.remove(shop);
  }
}