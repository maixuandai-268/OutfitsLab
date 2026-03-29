import { Controller, Get, Post, Body, Patch, Param, Request, ParseIntPipe, Delete, UseGuards, Query } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) { }

  // Người dùng đăng ký mở shop
  @UseGuards(JwtAuthGuard)
  @Post('become')
  create(@Request() req, @Body() createShopDto: CreateShopDto) {
    return this.shopsService.create(req.user.id, createShopDto);
  }

  // Admin lấy toàn bộ danh sách shop
  @Get()
  findAll() {
    return this.shopsService.findAll();
  }

  // Người dùng lấy thông tin shop của chính mình
  @UseGuards(JwtAuthGuard)
  @Get('my-shop')
  async getMyShop(@Request() req) {
    return this.shopsService.findByUserId(req.user.id);
  }

  // Lấy các shop đang chờ xét duyệt
  @Get('pending')
  getPending() {
    return this.shopsService.findPending();
  }

  // Admin phê duyệt shop
  @Patch(':id/approve')
  approveShop(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.approve(id);
  }

  // Admin từ chối shop
  @Patch(':id/reject')
  rejectShop(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.reject(id);
  }

  // Lấy chi tiết 1 shop (profile + thống kê)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.getShopProfile(id);
  }

  // Cập nhật shop
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(id, updateShopDto);
  }

  // Tăng lượt xem cho shop profile
  @Patch(':id/views')
  incrementViews(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.incrementViews(id);
  }

  // Ghi nhận lượt xem profile cửa hàng (FE gọi mỗi khi user vào trang shop)
  @Post(':id/track-view')
  trackView(
    @Param('id', ParseIntPipe) id: number,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.shopsService.trackView(id, sessionId);
  }

  // Lấy thống kê lượt xem theo tháng (dùng cho trang phân tích)
  @Get(':id/view-stats')
  getViewStats(
    @Param('id', ParseIntPipe) id: number,
    @Query('year') year?: string,
  ) {
    return this.shopsService.getMonthlyViewStats(id, year ? parseInt(year) : undefined);
  }

  // Xóa shop
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.remove(id);
  }
}