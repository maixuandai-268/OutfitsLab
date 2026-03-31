/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  Min,
  MaxLength,
  MinLength,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductStatus } from '../product.entity';

export class CreateProductDto {
  @ApiProperty({
    description: 'Tên sản phẩm',
    minLength: 2,
    maxLength: 255,
  })
  @IsString({ message: 'Tên sản phẩm phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  @MinLength(2, { message: 'Tên sản phẩm phải có ít nhất 2 ký tự' })
  @MaxLength(255, { message: 'Tên sản phẩm không được vượt quá 255 ký tự' })
  name: string;

  @ApiPropertyOptional({ description: 'URL ảnh sản phẩm' })
  @IsOptional()
  @IsString({ message: 'Ảnh phải là chuỗi URL' })
  image?: string;

  @ApiProperty({ description: 'Giá bán sản phẩm', minimum: 0 })
  @IsNumber({}, { message: 'Giá bán phải là số' })
  @IsNotEmpty({ message: 'Giá bán không được để trống' })
  @Min(0, { message: 'Giá bán không được âm' })
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional({ description: 'Mô tả sản phẩm' })
  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi' })
  description?: string;

  @ApiProperty({ description: 'Danh mục sản phẩm (shirts, pants...)' })
  @IsString()
  @IsNotEmpty({ message: 'Loại sản phẩm không được để trống' })
  type: string;

  @ApiProperty({ description: 'ID cửa hàng' })
  @IsNumber({}, { message: 'shop_id phải là số' })
  @IsNotEmpty({ message: 'shop_id không được để trống' })
  @Type(() => Number)
  shop_id: number;

  @ApiPropertyOptional({ description: 'ID cửa hàng (Bản cũ hỗ trợ)' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  shopId?: number;

  @ApiPropertyOptional({ description: 'Thương hiệu sản phẩm' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({ description: 'Tag sản phẩm (MỚI, HOT, SALE...)' })
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiPropertyOptional({ description: 'Danh sách kích cỡ' })
  @IsOptional()
  @IsArray({ message: 'sizes phải là một mảng' })
  sizes?: string[];

  @ApiPropertyOptional({ description: 'Danh sách mã màu' })
  @IsOptional()
  @IsArray({ message: 'colors phải là một mảng' })
  colors?: string[];

  @ApiPropertyOptional({ enum: ProductStatus, default: ProductStatus.ACTIVE })
  @IsOptional()
  @IsEnum(ProductStatus, { message: 'Trạng thái không hợp lệ' })
  status?: ProductStatus;
}