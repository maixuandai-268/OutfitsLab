/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FavouriteModule } from './modules/favourite/favourite.module';
import { ProductsModule } from './modules/shops/products.module';
import { ShopModule } from './modules/shops/shops.module';
import { BlogModule } from './modules/blog/blog.module';
require('dotenv').config();

const password = process.env.DB_PASSWORD || '';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: password,
      database: 'outfitslab_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    ShopModule,
    FavouriteModule,
    BlogModule,
  ],
})
export class AppModule { };
