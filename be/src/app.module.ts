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
import { ReviewsModule } from './modules/reviews/reviews.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { IssueReportModule } from './modules/report/report.module';
import { UploadModule } from './modules/upload/upload.module';
import { AdminStatsModule } from './modules/admin-stats/admin-stats.module';


require('dotenv').config();
const password = process.env.DB_PASSWORD || '';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,

      ssl: {
        rejectUnauthorized: false,
        
      },
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    ShopModule,
    FavouriteModule,
    BlogModule,
    ReviewsModule,
    NotificationsModule,
    IssueReportModule,
    UploadModule,
    AdminStatsModule,
  ],
})
export class AppModule { };
