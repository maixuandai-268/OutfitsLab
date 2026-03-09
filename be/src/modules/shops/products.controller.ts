/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import {
  ProductResponseDto,
  PaginatedProductResponseDto,
} from './dto/product-response.dto';
import { ProductStatus } from './product.entity';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}



  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo sản phẩm mới' })
  @ApiResponse({
    status: 201,
    description: 'Sản phẩm đã được tạo thành công',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }



  @Get()
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm (có phân trang & lọc)' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách sản phẩm',
    type: PaginatedProductResponseDto,
  })
  findAll(@Query() query: QueryProductDto) {
    return this.productsService.findAll(query);
  }

 

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết một sản phẩm theo ID' })
  @ApiParam({ name: 'id', description: 'UUID của sản phẩm' })
  @ApiResponse({
    status: 200,
    description: 'Chi tiết sản phẩm',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sản phẩm' })
  findOne(@Param('id', ParseUUIDPipe) id: number) {
    return this.productsService.findOne(id);
  }

  

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin sản phẩm' })
  @ApiParam({ name: 'id', description: 'UUID của sản phẩm' })
  @ApiResponse({
    status: 200,
    description: 'Sản phẩm đã được cập nhật',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sản phẩm' })
  update(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  

  @Patch(':id/status')
  @ApiOperation({ summary: 'Cập nhật trạng thái sản phẩm' })
  @ApiParam({ name: 'id', description: 'UUID của sản phẩm' })
  @ApiResponse({
    status: 200,
    description: 'Trạng thái đã được cập nhật',
    type: ProductResponseDto,
  })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: number,
    @Body('status') status: ProductStatus,
  ) {
    return this.productsService.updateStatus(id, status);
  }



  @Patch(':id/increment-sales')
  @ApiOperation({ summary: 'Tăng số lượt bán của sản phẩm' })
  @ApiParam({ name: 'id', description: 'UUID của sản phẩm' })
  @ApiResponse({
    status: 200,
    description: 'Số lượt bán đã được cập nhật',
    type: ProductResponseDto,
  })
  incrementSales(
    @Param('id', ParseUUIDPipe) id: number,
    @Body('quantity') quantity: number = 1,
  ) {
    return this.productsService.incrementSalesCount(id, quantity);
  }



  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xóa sản phẩm' })
  @ApiParam({ name: 'id', description: 'UUID của sản phẩm' })
  @ApiResponse({ status: 200, description: 'Sản phẩm đã được xóa' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sản phẩm' })
  remove(@Param('id', ParseUUIDPipe) id: number) {
    return this.productsService.remove(id);
  }
}