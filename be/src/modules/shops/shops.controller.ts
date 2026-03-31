import { Controller, Get, Post, Body, Patch, Param, Request, ParseIntPipe, Delete, UseGuards, Query } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) { }


  @UseGuards(JwtAuthGuard)
  @Post('become')
  create(@Request() req, @Body() createShopDto: CreateShopDto) {
    return this.shopsService.create(req.user.id, createShopDto);
  }


  @Get()
  findAll() {
    return this.shopsService.findAll();
  }


  @UseGuards(JwtAuthGuard)
  @Get('my-shop')
  async getMyShop(@Request() req) {
    return this.shopsService.findByUserId(req.user.id);
  }


  @Get('pending')
  getPending() {
    return this.shopsService.findPending();
  }


  @Patch(':id/approve')
  approveShop(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.approve(id);
  }

  @Patch(':id/reject')
  rejectShop(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.reject(id);
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.getShopProfile(id);
  }


  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(id, updateShopDto);
  }


  @Patch(':id/views')
  incrementViews(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.incrementViews(id);
  }

  @Post(':id/track-view')
  trackView(
    @Param('id', ParseIntPipe) id: number,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.shopsService.trackView(id, sessionId);
  }

  @Get(':id/view-stats')
  getViewStats(
    @Param('id', ParseIntPipe) id: number,
    @Query('year') year?: string,
  ) {
    return this.shopsService.getMonthlyViewStats(id, year ? parseInt(year) : undefined);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.remove(id);
  }
}
