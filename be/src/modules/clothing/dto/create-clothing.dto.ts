/* eslint-disable prettier/prettier */
import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  IsNumber,
  IsHexColor,
  MaxLength,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import type { ClothingSlot, Gender } from '../clothing.entity';

export class CreateClothingDto {
  @ApiProperty({ example: 'Áo thun trắng basic' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: 'Áo cotton 100%, form regular fit' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: ['top', 'bottom', 'shoes', 'hat', 'fullbody'],
    example: 'top',
  })
  @IsEnum(['top', 'bottom', 'shoes', 'hat', 'fullbody'])
  slot: ClothingSlot;

  @ApiProperty({ example: '/models/clothing/shirt_white.glb' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  modelPath: string;

  @ApiPropertyOptional({ example: '/thumbnails/shirt_white.jpg' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  thumbnailPath?: string;

  @ApiPropertyOptional({
    enum: ['male', 'female', 'unisex'],
    default: 'unisex',
    example: 'unisex',
  })
  @IsOptional()
  @IsEnum(['male', 'female', 'unisex'])
  gender?: Gender;

  @ApiPropertyOptional({
    type: [String],
    example: ['#ffffff', '#1a1a2e', '#e63946'],
    description: 'Mảng hex color có sẵn cho sản phẩm',
  })
  @IsOptional()
  @IsArray()
  @IsHexColor({ each: true })
  colors?: string[];

  @ApiPropertyOptional({ example: 299000, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price?: number;
}