import { Controller, Get, Post, Body, Patch, Param, Request, ParseIntPipe, Delete } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) { }

  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopsService.create(createShopDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) shopId: number,
    @Body() updateShopDto: UpdateShopDto,
  ) {
    return this.shopsService.update(shopId, updateShopDto);
  }

  @Get()
  findAll() {
    return this.shopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.remove(id);
  }
}