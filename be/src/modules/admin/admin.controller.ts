import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApproveSellerDto, UpdateUserStatusDto } from './dto/approve-seller.dto';

@Controller('admin') 
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('user-status')
  async handleUser(@Body() dto: UpdateUserStatusDto) {
    return this.adminService.updateUserStatus(dto);
  }

  @Get('pending-sellers')
  async getSellers() {
    return this.adminService.getPendingSellers();
  }

  @Post('approve-seller')
  async approve(@Body() dto: ApproveSellerDto) {
    return this.adminService.processSeller(dto);
  }
}