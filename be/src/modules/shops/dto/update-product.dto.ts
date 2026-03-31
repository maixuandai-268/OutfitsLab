/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  salesCount?: number;

  @IsOptional()
  @IsString()
  affiliateLink?: string;

  @IsOptional()
  @IsString()
  model3DUrl?: string;

  @IsOptional()
  @IsBoolean()
  is3DGenerated?: boolean;
}