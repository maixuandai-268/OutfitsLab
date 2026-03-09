/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsDateString, Min } from 'class-validator';
import { Type } from 'class-transformer';

// ─── Enums ────────────────────────────────────────────────────────────────────

export enum TrendPeriod {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

// ─── Query DTOs ───────────────────────────────────────────────────────────────

export class QueryTrendDto {
  @ApiPropertyOptional({
    description: 'Chu kỳ thống kê',
    enum: TrendPeriod,
    default: TrendPeriod.WEEKLY,
  })
  @IsOptional()
  @IsEnum(TrendPeriod)
  period?: TrendPeriod = TrendPeriod.WEEKLY;

  @ApiPropertyOptional({ description: 'Ngày bắt đầu (ISO 8601)', example: '2024-01-01' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ description: 'Ngày kết thúc (ISO 8601)', example: '2024-12-31' })
  @IsOptional()
  @IsDateString()
  to?: string;
}

export class QueryTopProductsDto {
  @ApiPropertyOptional({ description: 'Số sản phẩm muốn lấy', example: 5, default: 5 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit?: number = 5;

  @ApiPropertyOptional({
    description: 'Sắp xếp theo tiêu chí',
    enum: ['views', 'favorites'],
    default: 'views',
  })
  @IsOptional()
  @IsEnum(['views', 'favorites'])
  sortBy?: 'views' | 'favorites' = 'views';

  @ApiPropertyOptional({ description: 'Ngày bắt đầu', example: '2024-01-01' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ description: 'Ngày kết thúc', example: '2024-12-31' })
  @IsOptional()
  @IsDateString()
  to?: string;
}

export class QueryDateRangeDto {
  @ApiPropertyOptional({ description: 'Ngày bắt đầu', example: '2024-01-01' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ description: 'Ngày kết thúc', example: '2024-12-31' })
  @IsOptional()
  @IsDateString()
  to?: string;
}

// ─── Response DTOs ────────────────────────────────────────────────────────────

export class TrendItemDto {
  @ApiProperty({ example: 'Week 1' })
  label: string;

  @ApiProperty({ example: 3200 })
  count: number;
}

export class ViewTrendResponseDto {
  @ApiProperty({ type: [TrendItemDto] })
  data: TrendItemDto[];

  @ApiProperty({ example: 24600, description: 'Tổng lượt xem trong kỳ' })
  totalViews: number;

  @ApiProperty({ example: 3200, description: 'Thay đổi so với kỳ trước' })
  changeVsLastPeriod: number;

  @ApiProperty({ example: 'weekly' })
  period: string;
}

export class FavoriteTrendResponseDto {
  @ApiProperty({ type: [TrendItemDto] })
  data: TrendItemDto[];

  @ApiProperty({ example: 1850, description: 'Tổng lượt yêu thích trong kỳ' })
  totalFavorites: number;

  @ApiProperty({ example: 210, description: 'Thay đổi so với kỳ trước' })
  changeVsLastPeriod: number;

  @ApiProperty({ example: 'weekly' })
  period: string;
}

export class FavoriteRateResponseDto {
  @ApiProperty({ example: 7.5, description: 'Tỷ lệ yêu thích / lượt xem (%)' })
  rate: number;

  @ApiProperty({ example: 1.2, description: 'Thay đổi tỷ lệ so với kỳ trước (%)' })
  changeVsLastPeriod: number;

  @ApiProperty({ example: 1850, description: 'Tổng lượt yêu thích' })
  totalFavorites: number;

  @ApiProperty({ example: 24600, description: 'Tổng lượt xem' })
  totalViews: number;
}

export class AvgViewPerProductResponseDto {
  @ApiProperty({ example: 312, description: 'Lượt xem trung bình mỗi sản phẩm' })
  avgViewsPerProduct: number;

  @ApiProperty({ example: 45, description: 'Thay đổi so với kỳ trước' })
  changeVsLastPeriod: number;

  @ApiProperty({ example: 24600, description: 'Tổng lượt xem' })
  totalViews: number;

  @ApiProperty({ example: 79, description: 'Tổng số sản phẩm được xem' })
  totalProductsViewed: number;
}

export class TopProductItemDto {
  @ApiProperty({ example: 'uuid-string' })
  productId: string;

  @ApiProperty({ example: 'Premium Blazer' })
  name: string;

  @ApiProperty({ example: 'https://example.com/blazer.jpg', nullable: true })
  image: string | null;

  @ApiProperty({ example: 99.99 })
  price: number;

  @ApiProperty({ example: 542, description: 'Lượt xem' })
  views: number;

  @ApiProperty({ example: 128, description: 'Lượt yêu thích' })
  favorites: number;

  @ApiProperty({ example: 23.6, description: 'Tỷ lệ yêu thích (%)' })
  favoriteRate: number;
}

export class TopProductsResponseDto {
  @ApiProperty({ type: [TopProductItemDto] })
  data: TopProductItemDto[];
}

export class OverviewStatsResponseDto {
  @ApiProperty({ type: ViewTrendResponseDto })
  viewTrend: ViewTrendResponseDto;

  @ApiProperty({ type: FavoriteTrendResponseDto })
  favoriteTrend: FavoriteTrendResponseDto;

  @ApiProperty({ type: FavoriteRateResponseDto })
  favoriteRate: FavoriteRateResponseDto;

  @ApiProperty({ type: AvgViewPerProductResponseDto })
  avgViewPerProduct: AvgViewPerProductResponseDto;
}