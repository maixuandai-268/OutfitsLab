import { Controller, Get, Post, Body, Patch, Param, Request, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
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
    // Lấy userId từ token đã đăng nhập
    return this.shopsService.create(req.user.id, createShopDto);
  }

  @Get()
  findAll() {
    return this.shopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.remove(id);
  }
}