/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavouriteProduct } from './favourite-product.entity';
import { FavouriteShop } from './favourite-shop.entity';
import { Product } from '../shops/product.entity';
import { Shop } from '../shops/shop.entity';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectRepository(FavouriteProduct)
    private readonly favProductRepo: Repository<FavouriteProduct>,

    @InjectRepository(FavouriteShop)
    private readonly favShopRepo: Repository<FavouriteShop>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Shop)
    private readonly shopRepo: Repository<Shop>,
  ) { }

  async toggleProduct(
    userId: number,
    productId: number,
  ): Promise<{ isFavourite: boolean; message: string }> {
    const existing = await this.favProductRepo.findOne({
      where: { userId, productId },
    });
    if (existing) {
      await this.favProductRepo.remove(existing);
      return { isFavourite: false, message: 'Đã xóa sản phẩm khỏi danh sách yêu thích' };
    }
    await this.favProductRepo.save(
      this.favProductRepo.create({ userId, productId }),
    );
    return { isFavourite: true, message: 'Đã thêm sản phẩm vào danh sách yêu thích' };
  }

  async getFavouriteProducts(userId: number): Promise<Product[]> {
    return await this.productRepo.createQueryBuilder('product')
      .innerJoin(FavouriteProduct, 'fav', 'fav.productId = product.id')
      .leftJoinAndSelect('product.shop', 'shop')
      .where('fav.userId = :userId', { userId })
      .orderBy('fav.createdAt', 'DESC')
      .getMany();
  }

  async checkProduct(
    userId: number,
    productId: number,
  ): Promise<{ isFavourite: boolean }> {
    const exists = await this.favProductRepo.findOne({ where: { userId, productId } });
    return { isFavourite: !!exists };
  }

  async toggleShop(
    userId: number,
    shopId: number,
  ): Promise<{ isFavourite: boolean; message: string }> {
    const existing = await this.favShopRepo.findOne({
      where: { userId, shopId },
    });
    if (existing) {
      await this.favShopRepo.remove(existing);
      return { isFavourite: false, message: 'Đã xóa shop khỏi danh sách yêu thích' };
    }
    await this.favShopRepo.save(
      this.favShopRepo.create({ userId, shopId }),
    );
    return { isFavourite: true, message: 'Đã thêm shop vào danh sách yêu thích' };
  }

  async getFavouriteShops(userId: number): Promise<Shop[]> {
    return await this.shopRepo.createQueryBuilder('shop')
      .innerJoin(FavouriteShop, 'fav', 'fav.shopId = shop.id')
      .where('fav.userId = :userId', { userId })
      .orderBy('fav.createdAt', 'DESC')
      .getMany();
  }

  async checkShop(
    userId: number,
    shopId: number,
  ): Promise<{ isFavourite: boolean }> {
    const exists = await this.favShopRepo.findOne({ where: { userId, shopId } });
    return { isFavourite: !!exists };
  }
}
