/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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

  @ApiPropertyOptional({
    description: 'URL ảnh sản phẩm',
  })
  @IsOptional()
  @IsString({ message: 'Ảnh phải là chuỗi URL' })
  image?: string;

  @ApiProperty({
    description: 'Giá bán sản phẩm',
    minimum: 0,
  })
  @IsNumber({}, { message: 'Giá bán phải là số' })
  @IsNotEmpty({ message: 'Giá bán không được để trống' })
  @Min(0, { message: 'Giá bán không được âm' })
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional({
    description: 'Mô tả sản phẩm',
  })
  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Trạng thái sản phẩm',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(ProductStatus, {
    message: `Trạng thái phải là một trong: ${Object.values(ProductStatus).join(', ')}`,
  })
  status?: ProductStatus;
}