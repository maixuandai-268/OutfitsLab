import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUserEntity } from './entities/admin-user.entity';
import { AdminShopEntity } from './entities/admin-shop.entity';
import { ApproveSellerDto, UpdateUserStatusDto } from './dto/approve-seller.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminUserEntity)
    private userRepo: Repository<AdminUserEntity>,
    @InjectRepository(AdminShopEntity)
    private shopRepo: Repository<AdminShopEntity>,
  ) {}

  async updateUserStatus(dto: UpdateUserStatusDto) {
    return await this.userRepo.update(dto.userId, { is_active: dto.is_active });
  }

  async getPendingSellers() {
    return await this.shopRepo.find({ where: { status: 'pending' } });
  }

  async processSeller(dto: ApproveSellerDto) {
    return await this.shopRepo.update(dto.sellerId, { 
      status: dto.status, 
      reject_reason: dto.reason 
    });
  }
}