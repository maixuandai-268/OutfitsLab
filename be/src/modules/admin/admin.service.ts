import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getAllSellers() {
    return await this.shopRepo.find();
  }

  async getSellersByStatus(status: string) {
    return await this.shopRepo.find({ where: { status } });
  }

  async processSeller(dto: ApproveSellerDto) {
    const shop = await this.shopRepo.findOne({ where: { id: dto.sellerId } });
    if (!shop) throw new NotFoundException('Shop không tồn tại');

    await this.shopRepo.update(dto.sellerId, { 
      status: dto.status, 
      reject_reason: dto.status === 'rejected' ? (dto.reason || '') : ''
    });

    return { message: `Shop ${shop.shop_name} đã được ${dto.status}` };
  }

  async getDashboardStats() {
    const totalUsers = await this.userRepo.count();
    const totalSellers = await this.shopRepo.count({ where: { status: 'approved' } });
    
    return {
      summary: [
        { label: 'Total Users', value: totalUsers, growth: '+12.5%' },
        { label: 'Active Sellers', value: totalSellers, growth: '+8.2%' },
        { label: 'Products Listed', value: 12543, growth: '+23.1%' }
      ],
      salesChart: [
        { month: 'Jan', amount: 450 },
        { month: 'Feb', amount: 580 },
        { month: 'Mar', amount: 720 },
        { month: 'Apr', amount: 690 },
        { month: 'May', amount: 850 },
        { month: 'Jun', amount: 920 }
      ],
      systemHealth: {
        uptime: '99.95%',
        latency: '145ms',
        dbLoad: '45%',
        errorRate: '0.02%'
      }
    };
  }
}