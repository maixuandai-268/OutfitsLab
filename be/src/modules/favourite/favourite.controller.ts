/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FavouriteService } from './favourite.service';
import { Product } from '../shops/product.entity';
import { Shop } from '../shops/shop.entity';

@ApiTags('Favourite')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Get('products')
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm yêu thích' })
  async getFavouriteProducts(@Request() req: any): Promise<Product[]> {
    try {
      return await this.favouriteService.getFavouriteProducts(req.user.id);
    } catch (err) {
      console.error('[Favourite] getFavouriteProducts error:', err);
      throw new HttpException('Lỗi khi lấy danh sách yêu thích', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  } 

  @Post('products/:productId/toggle')
  @ApiOperation({ summary: 'Toggle yêu thích sản phẩm' })
  async toggleProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Request() req: any,
  ): Promise<{ isFavourite: boolean; message: string }> {
    try {
      console.log(`[Favourite] toggleProduct userId=${req.user.id} productId=${productId}`);
      return await this.favouriteService.toggleProduct(req.user.id, productId);
    } catch (err) {
      console.error('[Favourite] toggleProduct error:', err);
      throw new HttpException('Lỗi khi toggle yêu thích: ' + (err as Error).message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('products/:productId/check')
  @ApiOperation({ summary: 'Kiểm tra sản phẩm đã yêu thích chưa' })
  async checkProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Request() req: any,
  ): Promise<{ isFavourite: boolean }> {
    try {
      return await this.favouriteService.checkProduct(req.user.id, productId);
    } catch (err) {
      console.error('[Favourite] checkProduct error:', err);
      return { isFavourite: false };
    }
  }


  @Get('shops')
  @ApiOperation({ summary: 'Lấy danh sách shop yêu thích' })
  async getFavouriteShops(@Request() req: any): Promise<Shop[]> {
    try {
      return await this.favouriteService.getFavouriteShops(req.user.id);
    } catch (err) {
      console.error('[Favourite] getFavouriteShops error:', err);
      throw new HttpException('Lỗi khi lấy danh sách shop yêu thích', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('shops/:shopId/toggle')
  @ApiOperation({ summary: 'Toggle yêu thích shop' })
  async toggleShop(
    @Param('shopId', ParseIntPipe) shopId: number,
    @Request() req: any,
  ): Promise<{ isFavourite: boolean; message: string }> {
    try {
      console.log(`[Favourite] toggleShop userId=${req.user.id} shopId=${shopId}`);
      return await this.favouriteService.toggleShop(req.user.id, shopId);
    } catch (err) {
      console.error('[Favourite] toggleShop error:', err);
      throw new HttpException('Lỗi khi toggle shop yêu thích: ' + (err as Error).message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('shops/:shopId/check')
  @ApiOperation({ summary: 'Kiểm tra shop đã yêu thích chưa' })
  async checkShop(
    @Param('shopId', ParseIntPipe) shopId: number,
    @Request() req: any,
  ): Promise<{ isFavourite: boolean }> {
    try {
      return await this.favouriteService.checkShop(req.user.id, shopId);
    } catch (err) {
      console.error('[Favourite] checkShop error:', err);
      return { isFavourite: false };
    }
  }
}
