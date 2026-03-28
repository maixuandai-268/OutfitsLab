import { Injectable, NotFoundException, InternalServerErrorException, Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { NotificationController } from './notification.controller';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopsRepository: Repository<Shop>,
  ) { }

  // 1. Tạo Shop mới (Dùng cho trang Become)
  async create(userId: number, createShopDto: CreateShopDto) {
    try {
      const newShop = this.shopsRepository.create({
        ...createShopDto,
        ownerId: userId,
        status: 'pending',
        rating: 0,
      });
      return await this.shopsRepository.save(newShop);
    } catch (error) {
      console.error('Lỗi khi tạo shop:', error);
      throw new InternalServerErrorException('Không thể tạo cửa hàng, vui lòng thử lại.');
    }
  }

  // 2. Lấy tất cả danh sách Shop (Dùng cho Admin)
  async findAll() {
    return await this.shopsRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  // 3. Tìm 1 Shop cụ thể theo ID
  async findOne(id: number) {
    const shop = await this.shopsRepository.findOne({ where: { id } });
    if (!shop) throw new NotFoundException(`Không tìm thấy shop với ID ${id}`);
    return shop;
  }

  // 4. Tìm Shop theo ID người dùng (Dùng cho Dashboard của Seller)
  async findByUserId(userId: number) {
    const shops = await this.shopsRepository.find({
      where: { ownerId: userId },
      order: { id: 'DESC' }
    });
    return shops;
  }

  // 5. Cập nhật thông tin Shop chung
  async update(id: number, updateShopDto: UpdateShopDto) {
    const shop = await this.findOne(id);
    Object.assign(shop, updateShopDto);
    return await this.shopsRepository.save(shop);
  }

  // 6. Xóa Shop
  async remove(id: number) {
    const shop = await this.findOne(id);
    return await this.shopsRepository.remove(shop);
  }

  // 7. Lấy danh sách các shop đang chờ duyệt
  async findPending() {
    return await this.shopsRepository.find({ where: { status: 'pending' } });
  }

  // 8. Phê duyệt Shop (Chuyển sang approved)
  async approve(id: number) {
    const shop = await this.findOne(id);
    shop.status = 'approved';
    return await this.shopsRepository.save(shop);
  }

  // 9. Từ chối hoặc Chặn Shop (Chuyển sang Blocked)
  async reject(id: number) {
    const shop = await this.findOne(id);
    shop.status = 'rejected';
    return await this.shopsRepository.save(shop);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService], // export để ProductService dùng được
})
export class NotificationModule {
}
