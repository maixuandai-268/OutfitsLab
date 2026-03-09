/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, DataSource } from 'typeorm';
import { ProductAnalytics, AnalyticsEventType } from './product-analytics.entity';
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
  TrendPeriod,
} from './dto/analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(ProductAnalytics)
    private readonly analyticsRepo: Repository<ProductAnalytics>,
    private readonly dataSource: DataSource,
  ) {}

  // ─── View Trend ───────────────────────────────────────────────────────────

  async getViewTrend(query: QueryTrendDto): Promise<ViewTrendResponseDto> {
    const { period = TrendPeriod.WEEKLY, from, to } = query;
    const { dateFrom, dateTo, prevFrom } = this.buildDateRange(period, from, to);

    const [currentRows, prevCount] = await Promise.all([
      this.getTrendRows(AnalyticsEventType.VIEW, dateFrom, dateTo, period),
      this.countEvents(AnalyticsEventType.VIEW, prevFrom, dateFrom),
    ]);

    const data = currentRows.map((row) => ({
      label: this.formatLabel(row.period_key, period),
      count: parseInt(row.count) || 0,
    }));

    const totalViews = data.reduce((s, r) => s + r.count, 0);

    return {
      data,
      totalViews,
      changeVsLastPeriod: totalViews - prevCount,
      period,
    };
  }

  // ─── Favorite Trend ───────────────────────────────────────────────────────

  async getFavoriteTrend(query: QueryTrendDto): Promise<FavoriteTrendResponseDto> {
    const { period = TrendPeriod.WEEKLY, from, to } = query;
    const { dateFrom, dateTo, prevFrom } = this.buildDateRange(period, from, to);

    const [currentRows, prevCount] = await Promise.all([
      this.getTrendRows(AnalyticsEventType.FAVORITE, dateFrom, dateTo, period),
      this.countEvents(AnalyticsEventType.FAVORITE, prevFrom, dateFrom),
    ]);

    const data = currentRows.map((row) => ({
      label: this.formatLabel(row.period_key, period),
      count: parseInt(row.count) || 0,
    }));

    const totalFavorites = data.reduce((s, r) => s + r.count, 0);

    return {
      data,
      totalFavorites,
      changeVsLastPeriod: totalFavorites - prevCount,
      period,
    };
  }

  // ─── Favorite Rate ────────────────────────────────────────────────────────

  async getFavoriteRate(query: QueryDateRangeDto): Promise<FavoriteRateResponseDto> {
    const dateTo = query.to ? new Date(query.to) : new Date();
    const dateFrom = query.from ? new Date(query.from) : this.subtractDays(dateTo, 30);
    const prevFrom = this.subtractDays(dateFrom, 30);

    const [totalViews, totalFavorites, prevViews, prevFavorites] = await Promise.all([
      this.countEvents(AnalyticsEventType.VIEW, dateFrom, dateTo),
      this.countEvents(AnalyticsEventType.FAVORITE, dateFrom, dateTo),
      this.countEvents(AnalyticsEventType.VIEW, prevFrom, dateFrom),
      this.countEvents(AnalyticsEventType.FAVORITE, prevFrom, dateFrom),
    ]);

    const rate = totalViews > 0 ? (totalFavorites / totalViews) * 100 : 0;
    const prevRate = prevViews > 0 ? (prevFavorites / prevViews) * 100 : 0;

    return {
      rate: parseFloat(rate.toFixed(2)),
      changeVsLastPeriod: parseFloat((rate - prevRate).toFixed(2)),
      totalFavorites,
      totalViews,
    };
  }

  // ─── Avg Views Per Product ────────────────────────────────────────────────

  async getAvgViewPerProduct(query: QueryDateRangeDto): Promise<AvgViewPerProductResponseDto> {
    const dateTo = query.to ? new Date(query.to) : new Date();
    const dateFrom = query.from ? new Date(query.from) : this.subtractDays(dateTo, 30);
    const prevFrom = this.subtractDays(dateFrom, 30);

    const current = await this.analyticsRepo
      .createQueryBuilder('a')
      .select('COUNT(a.id)', 'totalViews')
      .addSelect('COUNT(DISTINCT a.productId)', 'totalProducts')
      .where('a.eventType = :type', { type: AnalyticsEventType.VIEW })
      .andWhere('a.createdAt BETWEEN :from AND :to', { from: dateFrom, to: dateTo })
      .getRawOne();

    const prev = await this.analyticsRepo
      .createQueryBuilder('a')
      .select('COUNT(a.id)', 'totalViews')
      .addSelect('COUNT(DISTINCT a.productId)', 'totalProducts')
      .where('a.eventType = :type', { type: AnalyticsEventType.VIEW })
      .andWhere('a.createdAt BETWEEN :from AND :to', { from: prevFrom, to: dateFrom })
      .getRawOne();

    const totalViews = parseInt(current.totalViews) || 0;
    const totalProductsViewed = parseInt(current.totalProducts) || 0;
    const avgViewsPerProduct = totalProductsViewed > 0
      ? Math.round(totalViews / totalProductsViewed)
      : 0;

    const prevViews = parseInt(prev.totalViews) || 0;
    const prevProducts = parseInt(prev.totalProducts) || 0;
    const prevAvg = prevProducts > 0 ? Math.round(prevViews / prevProducts) : 0;

    return {
      avgViewsPerProduct,
      changeVsLastPeriod: avgViewsPerProduct - prevAvg,
      totalViews,
      totalProductsViewed,
    };
  }

  // ─── Top Products ─────────────────────────────────────────────────────────

  async getTopProducts(query: QueryTopProductsDto): Promise<TopProductsResponseDto> {
    const { limit = 5, sortBy = 'views', from, to } = query;
    const dateTo = to ? new Date(to) : new Date();
    const dateFrom = from ? new Date(from) : this.subtractDays(dateTo, 30);

    const rows = await this.analyticsRepo
      .createQueryBuilder('a')
      .select('a.productId', 'productId')
      .addSelect(
        `SUM(CASE WHEN a.eventType = 'view' THEN 1 ELSE 0 END)`,
        'views',
      )
      .addSelect(
        `SUM(CASE WHEN a.eventType = 'favorite' THEN 1 ELSE 0 END)`,
        'favorites',
      )
      .where('a.eventType IN (:...types)', {
        types: [AnalyticsEventType.VIEW, AnalyticsEventType.FAVORITE],
      })
      .andWhere('a.createdAt BETWEEN :from AND :to', { from: dateFrom, to: dateTo })
      .groupBy('a.productId')
      .orderBy(sortBy === 'favorites' ? 'favorites' : 'views', 'DESC')
      .limit(limit)
      .getRawMany();

    // Join với bảng products để lấy name/image/price
    const productIds = rows.map((r) => r.productId);
    let productsMap: Record<string, any> = {};

    if (productIds.length > 0) {
      const products = await this.dataSource
        .getRepository('products')
        .createQueryBuilder('p')
        .select(['p.id', 'p.name', 'p.image', 'p.price'])
        .where('p.id IN (:...ids)', { ids: productIds })
        .getMany()
        .catch(() => []);

      productsMap = Object.fromEntries((products as any[]).map((p) => [p.id, p]));
    }

    const data = rows.map((row) => {
      const views = parseInt(row.views) || 0;
      const favorites = parseInt(row.favorites) || 0;
      return {
        productId: row.productId,
        name: productsMap[row.productId]?.name ?? 'Unknown',
        image: productsMap[row.productId]?.image ?? null,
        price: parseFloat(productsMap[row.productId]?.price ?? 0),
        views,
        favorites,
        favoriteRate: views > 0 ? parseFloat(((favorites / views) * 100).toFixed(2)) : 0,
      };
    });

    return { data };
  }

  // ─── Overview ─────────────────────────────────────────────────────────────

  async getOverview(query: QueryDateRangeDto): Promise<OverviewStatsResponseDto> {
    const { from, to } = query;

    const [viewTrend, favoriteTrend, favoriteRate, avgViewPerProduct] =
      await Promise.all([
        this.getViewTrend({ period: TrendPeriod.WEEKLY, from, to }),
        this.getFavoriteTrend({ period: TrendPeriod.WEEKLY, from, to }),
        this.getFavoriteRate({ from, to }),
        this.getAvgViewPerProduct({ from, to }),
      ]);

    return { viewTrend, favoriteTrend, favoriteRate, avgViewPerProduct };
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private async getTrendRows(
    eventType: AnalyticsEventType,
    from: Date,
    to: Date,
    period: TrendPeriod,
  ) {
    const groupFormat = this.getGroupFormat(period);
    return this.analyticsRepo
      .createQueryBuilder('a')
      .select(groupFormat, 'period_key')
      .addSelect('COUNT(a.id)', 'count')
      .where('a.eventType = :type', { type: eventType })
      .andWhere('a.createdAt BETWEEN :from AND :to', { from, to })
      .groupBy('period_key')
      .orderBy('period_key', 'ASC')
      .getRawMany();
  }

  private async countEvents(
    eventType: AnalyticsEventType,
    from: Date,
    to: Date,
  ): Promise<number> {
    return this.analyticsRepo.count({
      where: { eventType, createdAt: Between(from, to) },
    });
  }

  private buildDateRange(period: TrendPeriod, from?: string, to?: string) {
    const dateTo = to ? new Date(to) : new Date();
    const dateFrom = from ? new Date(from) : this.getDefaultFrom(period);
    const diff = dateTo.getTime() - dateFrom.getTime();
    const prevFrom = new Date(dateFrom.getTime() - diff);
    return { dateFrom, dateTo, prevFrom };
  }

  private getGroupFormat(period: TrendPeriod): string {
    if (period === TrendPeriod.MONTHLY) return `DATE_FORMAT(a.createdAt, '%Y-%m')`;
    if (period === TrendPeriod.YEARLY)  return `DATE_FORMAT(a.createdAt, '%Y')`;
    return `DATE_FORMAT(a.createdAt, '%Y-%u')`; // weekly default
  }

  private formatLabel(periodKey: string, period: TrendPeriod): string {
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    if (period === TrendPeriod.MONTHLY) {
      return MONTHS[parseInt(periodKey.split('-')[1], 10) - 1] ?? periodKey;
    }
    if (period === TrendPeriod.WEEKLY) {
      return `Week ${parseInt(periodKey.split('-')[1], 10)}`;
    }
    return periodKey;
  }

  private getDefaultFrom(period: TrendPeriod): Date {
    const now = new Date();
    if (period === TrendPeriod.WEEKLY)  return this.subtractDays(now, 49);  // 7 tuần
    if (period === TrendPeriod.MONTHLY) return this.subtractDays(now, 180); // 6 tháng
    return this.subtractDays(now, 730); // 2 năm
  }

  private subtractDays(date: Date, days: number): Date {
    const d = new Date(date);
    d.setDate(d.getDate() - days);
    return d;
  }
}