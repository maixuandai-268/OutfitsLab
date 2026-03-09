/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({
    description: 'Số lượt bán (chỉ dùng khi cần cập nhật thủ công)',
    example: 150,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Số lượt bán phải là số' })
  @Min(0, { message: 'Số lượt bán không được âm' })
  @Type(() => Number)
  salesCount?: number;
}