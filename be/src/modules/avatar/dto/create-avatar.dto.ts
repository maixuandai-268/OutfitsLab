/* eslint-disable prettier/prettier */
import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { AvatarGender } from '../avatar.entity';

export class CreateAvatarDto {
  @ApiProperty({ example: 'Female Avatar v1' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ enum: ['male', 'female'], example: 'female' })
  @IsEnum(['male', 'female'])
  gender: AvatarGender;

  @ApiProperty({ example: '/models/avatars/female_v1.glb' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  modelPath: string;

  @ApiPropertyOptional({ example: '/thumbnails/avatars/female_v1.jpg' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  thumbnailPath?: string;

  @ApiPropertyOptional({ example: 'v1' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  version?: string;

  @ApiPropertyOptional({
    example: 'mixamo',
    description: 'Chuẩn đặt tên bones: mixamo | rigify | custom',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  boneConvention?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['mixamorigHips', 'mixamorigSpine', 'mixamorigLeftArm'],
    description: 'Danh sách tên bones trong model — để check compatibility với quần áo',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  boneNames?: string[];
}