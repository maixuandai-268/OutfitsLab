/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import type { ClothingSlot } from '../clothing.entity';


export class ViewerQueryDto {
  @ApiPropertyOptional({ enum: ['top', 'bottom', 'shoes', 'hat',] })
  @IsOptional()
  @IsEnum(['top', 'bottom', 'shoes', 'hat',])
  slot?: ClothingSlot;

  @ApiPropertyOptional({ enum: ['male', 'female'] })
  @IsOptional()
  @IsEnum(['male', 'female'])
  gender?: 'male' | 'female';
}

export class ViewerClothingResponseDto {
  @ApiProperty({ example: 'uuid-here' })
  id: string;

  @ApiProperty({ example: 'Áo thun trắng basic' })
  name: string;

  @ApiProperty({ enum: ['top', 'bottom', 'shoes', 'hat',] })
  slot: ClothingSlot;

  @ApiProperty({
    example: '/models/clothing/shirt_white.glb',
    description: 'Đường dẫn file .glb trong /public FE — Three.js dùng trực tiếp',
  })
  modelUrl: string;

  @ApiPropertyOptional({ example: '/thumbnails/shirt_white.jpg' })
  thumbnailUrl: string | null;

  @ApiProperty({ type: [String], example: ['#ffffff', '#1a1a2e'] })
  colors: string[];

  @ApiProperty({ example: 299000 })
  price: number;
}