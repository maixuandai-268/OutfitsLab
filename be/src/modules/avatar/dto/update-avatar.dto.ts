/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateAvatarDto } from './create-avatar.dto';

export class UpdateAvatarDto extends PartialType(CreateAvatarDto) {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}