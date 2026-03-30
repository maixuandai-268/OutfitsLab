/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Product } from '../shops/product.entity';
import { AdminStatsController } from './admin-stats.controller';
import { AdminStatsService } from './admin-stats.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  controllers: [AdminStatsController],
  providers: [AdminStatsService],
})
export class AdminStatsModule { }