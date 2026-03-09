import { Controller, Get, Post, Body, Patch, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApproveSellerDto, UpdateUserStatusDto } from './dto/approve-seller.dto';

@Controller('admin') 
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  async getStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('sellers')
  async getSellers(@Query('status') status: string) {
    if (status && status !== 'all') {
      return this.adminService.getSellersByStatus(status);
    }
    return this.adminService.getAllSellers();
  }

  @Patch('user-status')
  async handleUser(@Body() dto: UpdateUserStatusDto) {
    return this.adminService.updateUserStatus(dto);
  } 

  @Get('pending-sellers')
  async getPendingSellers() {   // renamed
    return this.adminService.getPendingSellers();
  }

  @Post('approve-seller')
  async approve(@Body() dto: ApproveSellerDto) {
    return this.adminService.processSeller(dto);
  }
}