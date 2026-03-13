/* eslint-disable prettier/prettier */
// compatibility-query.dto.ts


import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompatibilityQueryDto {
  @ApiProperty({
    type: [String],
    example: ['mixamorigHips', 'mixamorigSpine', 'unknownBone'],
    description: 'Danh sách tên bones từ file .glb quần áo cần kiểm tra',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  bones: string[];
}

import { ApiPropertyOptional } from '@nestjs/swagger';

export class CompatibilityResponseDto {
  @ApiProperty({ example: true, description: 'true nếu tất cả bones đều khớp' })
  compatible: boolean;

  @ApiPropertyOptional({
    type: [String],
    example: ['unknownBone'],
    description: 'Bones không tìm thấy trong avatar — cần sửa trong Blender',
  })
  missingBones: string[];
}


import { IsEnum } from 'class-validator';
import type { AvatarGender } from '../avatar.entity';

export class GenderQueryDto {
  @ApiProperty({ enum: ['male', 'female'], example: 'female' })
  @IsEnum(['male', 'female'])
  gender: AvatarGender;
}