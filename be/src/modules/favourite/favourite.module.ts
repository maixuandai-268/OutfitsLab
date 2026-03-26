/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouriteProduct } from './favourite-product.entity';
import { FavouriteShop } from './favourite-shop.entity';
import { FavouriteService } from './favourite.service';
import { FavouriteController } from './favourite.controller';
import { Product } from '../shops/product.entity';
import { Shop } from '../shops/shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavouriteProduct, FavouriteShop, Product, Shop])],
  providers: [FavouriteService],
  controllers: [FavouriteController],
  exports: [FavouriteService],
})
export class FavouriteModule { }
