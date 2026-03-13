/* eslint-disable prettier/prettier */
import { IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import type { ClothingSlot, Gender } from '../clothing.entity';

export class QueryClothingDto {
  @ApiPropertyOptional({
    enum: ['top', 'bottom', 'shoes', 'hat', 'fullbody'],
    example: 'top',
    description: 'Lọc theo vị trí mặc',
  })
  @IsOptional()
  @IsEnum(['top', 'bottom', 'shoes', 'hat', 'fullbody'])
  slot?: ClothingSlot;

  @ApiPropertyOptional({
    enum: ['male', 'female', 'unisex'],
    example: 'female',
    description: 'Lọc theo giới tính',
  })
  @IsOptional()
  @IsEnum(['male', 'female', 'unisex'])
  gender?: Gender;

  @ApiPropertyOptional({
    example: true,
    default: true,
    description: 'Lọc theo trạng thái active',
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean;
}