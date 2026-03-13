/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateClothingDto } from './create-clothing.dto';

export class UpdateClothingDto extends PartialType(CreateClothingDto) {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}