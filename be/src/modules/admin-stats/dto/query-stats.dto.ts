/* eslint-disable prettier/prettier */
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum StatsPeriod {
  WEEK    = 'week',
  MONTH   = 'month',
  QUARTER = 'quarter',
  YEAR    = 'year',
}

export class QueryStatsDto {
  @ApiPropertyOptional({
    enum: StatsPeriod,
    default: StatsPeriod.MONTH,
    description: 'Chu kỳ thống kê (tuần / tháng / quý / năm)',
  })
  @IsOptional()
  @IsEnum(StatsPeriod)
  period?: StatsPeriod = StatsPeriod.MONTH;

  @ApiPropertyOptional({ example: '2025-01-01', description: 'Từ ngày — ghi đè period' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ example: '2025-03-31', description: 'Đến ngày — ghi đè period' })
  @IsOptional()
  @IsDateString()
  to?: string;
}