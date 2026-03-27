import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopsRepository: Repository<Shop>,
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
    return await this.shopsRepository.save(shop);
  }

  // FIX: Thay vì đổi status thành rejected, ta xóa luôn khỏi DB
  async reject(id: number) {
    const shop = await this.findOne(id);
    return await this.shopsRepository.remove(shop);
  }
}