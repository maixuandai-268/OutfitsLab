import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private shopsRepository: Repository<Shop>,
    private usersService: UsersService,
  ) { }

  // Tìm đến hàm create trong ShopsService
async create(userId: number, createShopDto: CreateShopDto): Promise<Shop> {
  // 1. Kiểm tra xem user này đã có shop chưa
  const existingShop = await this.shopsRepository.findOne({ where: { ownerId: userId } });
  if (existingShop) {
    throw new BadRequestException('Bạn đã sở hữu một cửa hàng rồi.');
  }

  // 2. Tạo shop mới gắn với userId
  const newShop = this.shopsRepository.create({
    ...createShopDto,
    ownerId: userId, // Đảm bảo Entity Shop của bạn có cột ownerId
  });
  
  const savedShop = await this.shopsRepository.save(newShop);

  // 3. Cập nhật role của User thành 'shop'
  await this.usersService.update(userId, { role: 'shop' } as any);

  return savedShop;
}

  async update(shopId: number, updateShopDto: UpdateShopDto): Promise<Shop> {
    const shop = await this.shopsRepository.findOne({ where: { id: shopId } });
    if (!shop) throw new NotFoundException('Không tìm thấy cửa hàng này.');
    Object.assign(shop, updateShopDto);
    return await this.shopsRepository.save(shop);
  }

  async findOne(id: number): Promise<Shop> {
    const shop = await this.shopsRepository.findOne({
      where: { id },
      select: {
        id: true,
        shop_name: true,
        avatar_url: true,
        description: true,
        rating: true,
        location: true,
        created_at: true,
      },
    });
    if (!shop) throw new NotFoundException(`Cửa hàng với ID ${id} không tồn tại.`);
    return shop;
  }

  async findAll(): Promise<Shop[]> {
    return await this.shopsRepository.find({
      select: { id: true, shop_name: true, avatar_url: true, rating: true, location: true },
      take: 20,
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.shopsRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Cửa hàng với ID ${id} không tồn tại.`);
  }
}