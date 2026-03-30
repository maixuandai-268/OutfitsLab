/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEnum, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductStatus } from '../product.entity';

export class QueryProductDto {
  @ApiPropertyOptional({ description: 'ID cửa hàng' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  shop_id?: number;

  @ApiPropertyOptional({ description: 'ID shop (camelCase hỗ trợ cả 2)' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  shopId?: number;

  @ApiPropertyOptional({ description: 'Từ khóa tìm kiếm tên/mô tả' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: ProductStatus })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @ApiPropertyOptional({ description: 'Danh mục (shirts, pants...)' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ description: 'Slot thử đồ: top | bottom | shoes | hat' })
  @IsOptional()
  @IsString()
  garment_slot?: string;

  @ApiPropertyOptional({ description: 'Thương hiệu' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({ description: 'Giới tính (male, female)' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ description: 'Tag (MỚI, HOT...)' })
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiPropertyOptional({ description: 'Lọc theo danh sách màu' })
  @IsOptional()
  @IsArray()
  colors?: string[];

  @ApiPropertyOptional({ description: 'Lọc theo danh sách size' })
  @IsOptional()
  @IsArray()
  sizes?: string[];

  @ApiPropertyOptional({ description: 'Giá tối thiểu' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Giá tối đa' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Trang hiện tại', default: 1 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Số lượng mỗi trang', default: 10 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Sắp xếp theo field', default: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ description: 'Thứ tự sắp xếp', enum: ['ASC', 'DESC'], default: 'DESC' })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}