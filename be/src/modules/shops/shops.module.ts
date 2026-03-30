import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './shop.entity';
import { ShopView } from './shop-view.entity';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, ShopView]), UsersModule, NotificationsModule],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [TypeOrmModule, ShopsService]
})
export class ShopModule {}