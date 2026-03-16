/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { User } from '../users/user.entity'; 
import { QueryStatsDto, StatsPeriod } from './dto/query-stats.dto';
import {
  GrowthDataPointDto,
  RoleStatItemDto,
  StatusStatItemDto,
  UserStatsResponseDto,
} from './dto/stats-response.dto';

@Injectable()
export class AdminStatsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // ── Public ───────────────────────────────────────────────

  async getUserStats(query: QueryStatsDto): Promise<UserStatsResponseDto> {
    const { from, to } = this.resolveDateRange(query);

    const [total, active, inactive, newInPeriod, prevCount] = await Promise.all([
      this.userRepo.count(),
      this.userRepo.count({ where: { isActive: true } }),   // ← dùng isActive
      this.userRepo.count({ where: { isActive: false } }),
      this.userRepo.count({ where: { createdAt: Between(from, to) } }),
      this.countPrevPeriod(from, to),
    ]);

    const growthRate =
      prevCount > 0
        ? +((((newInPeriod - prevCount) / prevCount) * 100).toFixed(2))
        : newInPeriod > 0 ? 100 : 0;

    const [growth, byRole, byStatus] = await Promise.all([
      this.buildGrowth(query, from, to),
      this.buildByRole(total),
      this.buildByStatus(total, active, inactive),
    ]);

    return {
      overview: { total, active, inactive, newInPeriod, growthRate },
      growth,
      byRole,
      byStatus,
      computedAt: new Date(),
    };
  }


  private resolveDateRange(query: QueryStatsDto): { from: Date; to: Date } {
    if (query.from && query.to) {
      return { from: new Date(query.from), to: new Date(query.to) };
    }

    const to = new Date();
    const from = new Date();

    switch (query.period) {
      case StatsPeriod.WEEK:
        from.setDate(from.getDate() - 7);
        break;
      case StatsPeriod.QUARTER:
        from.setMonth(from.getMonth() - 3);
        break;
      case StatsPeriod.YEAR:
        from.setFullYear(from.getFullYear() - 1);
        break;
      default: 
        from.setMonth(from.getMonth() - 1);
    }

    return { from, to };
  }

  private async countPrevPeriod(currentFrom: Date, currentTo: Date): Promise<number> {
    const span = currentTo.getTime() - currentFrom.getTime();
    const prevTo   = new Date(currentFrom.getTime() - 1);
    const prevFrom = new Date(prevTo.getTime() - span);
    return this.userRepo.count({ where: { createdAt: Between(prevFrom, prevTo) } });
  }

  private async buildGrowth(
    query: QueryStatsDto,
    from: Date,
    to: Date,
  ): Promise<{ data: GrowthDataPointDto[]; period: string }> {
    const fmt = query.period === StatsPeriod.WEEK ? '%Y-%u' : '%Y-%m';

    const rows: { label: string; count: string }[] = await this.userRepo
      .createQueryBuilder('u')
      .select(`DATE_FORMAT(u.createdAt, '${fmt}')`, 'label')
      .addSelect('COUNT(*)', 'count')
      .where('u.createdAt BETWEEN :from AND :to', { from, to })
      .groupBy('label')
      .orderBy('label', 'ASC')
      .getRawMany();

    let cumulative = await this.userRepo.count({
      where: { createdAt: Between(new Date(0), from) },
    });

    const data: GrowthDataPointDto[] = rows.map((r) => {
      cumulative += Number(r.count);
      return {
        label: r.label,
        newUsers: Number(r.count),
        cumulativeTotal: cumulative,
      };
    });

    return { data, period: query.period ?? StatsPeriod.MONTH };
  }

  private async buildByRole(total: number): Promise<{ breakdown: RoleStatItemDto[] }> {
    // role là string literal ('user' | 'admin' | 'shop') — group by trực tiếp
    const rows: { role: string; count: string }[] = await this.userRepo
      .createQueryBuilder('u')
      .select('u.role', 'role')
      .addSelect('COUNT(*)', 'count')
      .groupBy('u.role')
      .getRawMany();

    const breakdown: RoleStatItemDto[] = rows.map((r) => ({
      role: r.role,
      count: Number(r.count),
      percentage: total > 0 ? +((Number(r.count) / total) * 100).toFixed(2) : 0,
    }));

    return { breakdown };
  }

  private buildByStatus(
    total: number,
    active: number,
    inactive: number,
  ): { breakdown: StatusStatItemDto[] } {
    const pct = (n: number) => (total > 0 ? +((n / total) * 100).toFixed(2) : 0);

    return {
      breakdown: [
        { status: 'active',   count: active,   percentage: pct(active) },
        { status: 'inactive', count: inactive, percentage: pct(inactive) },
      ],
    };
  }
}