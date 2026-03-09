/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import {
  QueryTrendDto,
  QueryTopProductsDto,
  QueryDateRangeDto,
  ViewTrendResponseDto,
  FavoriteTrendResponseDto,
  FavoriteRateResponseDto,
  AvgViewPerProductResponseDto,
  TopProductsResponseDto,
  OverviewStatsResponseDto,
} from './dto/analytics.dto';

@ApiTags('Analytics')
@ApiBearerAuth()
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Tổng quan thống kê (View Trend + Favorite Trend + Tỷ lệ + Avg)' })
  @ApiResponse({ status: 200, type: OverviewStatsResponseDto })
  getOverview(@Query() query: QueryDateRangeDto) {
    return this.analyticsService.getOverview(query);
  }

  @Get('view-trend')
  @ApiOperation({ summary: 'Xu hướng lượt xem sản phẩm theo tuần/tháng/năm' })
  @ApiResponse({ status: 200, type: ViewTrendResponseDto })
  getViewTrend(@Query() query: QueryTrendDto) {
    return this.analyticsService.getViewTrend(query);
  }

  @Get('favorite-trend')
  @ApiOperation({ summary: 'Xu hướng lượt yêu thích theo tuần/tháng/năm' })
  @ApiResponse({ status: 200, type: FavoriteTrendResponseDto })
  getFavoriteTrend(@Query() query: QueryTrendDto) {
    return this.analyticsService.getFavoriteTrend(query);
  }

  @Get('favorite-rate')
  @ApiOperation({ summary: 'Tỷ lệ yêu thích / lượt xem (%)' })
  @ApiResponse({ status: 200, type: FavoriteRateResponseDto })
  getFavoriteRate(@Query() query: QueryDateRangeDto) {
    return this.analyticsService.getFavoriteRate(query);
  }

  @Get('avg-view-per-product')
  @ApiOperation({ summary: 'Lượt xem trung bình mỗi sản phẩm' })
  @ApiResponse({ status: 200, type: AvgViewPerProductResponseDto })
  getAvgViewPerProduct(@Query() query: QueryDateRangeDto) {
    return this.analyticsService.getAvgViewPerProduct(query);
  }

  @Get('top-products')
  @ApiOperation({ summary: 'Top sản phẩm theo lượt xem hoặc lượt yêu thích' })
  @ApiResponse({ status: 200, type: TopProductsResponseDto })
  getTopProducts(@Query() query: QueryTopProductsDto) {
    return this.analyticsService.getTopProducts(query);
  }
}