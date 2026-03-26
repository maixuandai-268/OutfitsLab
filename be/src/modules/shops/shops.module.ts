import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './shop.entity';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), UsersModule],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [TypeOrmModule, ShopsService]
})
export class ShopModule {}