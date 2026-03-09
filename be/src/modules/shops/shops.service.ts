/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private shopsRepository: Repository<Shop>,
  ) { }

  async create(createShopDto: CreateShopDto): Promise<Shop> {
    const newShop = this.shopsRepository.create(createShopDto);
    return this.shopsRepository.save(newShop);
  }

  async update(shopId: number, updateShopDto: UpdateShopDto): Promise<Shop> {
    const shop = await this.shopsRepository.findOne({
      where: { id: shopId },
    });

    if (!shop) {
      throw new NotFoundException('Không tìm thấy cửa hàng này.');
    }

    Object.assign(shop, updateShopDto);

    return await this.shopsRepository.save(shop);
  }

  async remove(id: number): Promise<void> {
    const result = await this.shopsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cửa hàng với ID ${id} không tồn tại.`);
    }
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

    if (!shop) {
      throw new NotFoundException(`Cửa hàng với ID ${id} không tồn tại.`);
    }

    return shop;
  }

  async findAll(): Promise<Shop[]> {
    return await this.shopsRepository.find({
      select: {
        id: true,
        shop_name: true,
        avatar_url: true,
        rating: true,
        location: true,
      },
      take: 20,
    });
  }

}