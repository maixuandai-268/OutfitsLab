/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { QueryStatsDto, StatsPeriod } from './dto/query-stats.dto';
import {
  GrowthDataPointDto,
  RoleStatItemDto,
  StatusStatItemDto,
  UserStatsResponseDto,
} from './dto/stats-response.dto';
import { plainToInstance } from 'class-transformer';

type Driver = 'postgres' | 'mysql' | 'mariadb' | 'sqlite';

@Injectable()
export class AdminStatsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}


  async getUserStats(query: QueryStatsDto): Promise<UserStatsResponseDto> {
    const { from, to } = this.resolveDateRange(query);

    const [total, active, inactive, newInPeriod, prevCount] = await Promise.all([
      this.userRepo.count(),
      this.userRepo.count({ where: { isActive: true } }),
      this.userRepo.count({ where: { isActive: false } }),
      this.userRepo.count({ where: { createdAt: Between(from, to) } }),
      this.countPrevPeriod(from, to),
    ]);

    const growthRate =
      prevCount > 0
        ? +(((newInPeriod - prevCount) / prevCount) * 100).toFixed(2)
        : newInPeriod > 0
          ? 100
          : 0;

    const [growth, byRole, byStatus] = await Promise.all([
      this.buildGrowth(query, from, to),
      this.buildByRole(total),
      this.buildByStatus(total, active, inactive),
    ]);

    return plainToInstance(UserStatsResponseDto, {
      overview: { total, active, inactive, newInPeriod, growthRate },
      growth,
      byRole,
      byStatus,
      computedAt: new Date(),
    });
  }


  private resolveDateRange(query: QueryStatsDto): { from: Date; to: Date } {
    if (query.from && query.to) {
      const from = new Date(query.from);
      const to = new Date(query.to);
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);
      if (from.getTime() > to.getTime()) {
        return { from: to, to: from };
      }
      return { from, to };
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
    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);
    return { from, to };
  }

  private async countPrevPeriod(currentFrom: Date, currentTo: Date): Promise<number> {
    const span = currentTo.getTime() - currentFrom.getTime();
    const prevTo = new Date(currentFrom.getTime() - 1);
    const prevFrom = new Date(prevTo.getTime() - span);
    return this.userRepo.count({ where: { createdAt: Between(prevFrom, prevTo) } });
  }

  private getDriver(): Driver {
    const type = (this.userRepo.manager.connection.options as any)?.type as Driver;
    return (type || process.env.DB_TYPE || 'mysql') as Driver;
  }

  private getLabelExpr(period: StatsPeriod | undefined, driver: Driver) {
    const isWeek = period === StatsPeriod.WEEK;
    if (driver === 'postgres') {
      return isWeek
        ? `to_char(date_trunc('week', u.createdAt), 'IYYY-IW')`
        : `to_char(date_trunc('month', u.createdAt), 'YYYY-MM')`;
    }
    if (driver === 'sqlite') {
      return isWeek
        ? `strftime('%Y-%W', u.createdAt)` 
        : `strftime('%Y-%m', u.createdAt)`;
    }
    return isWeek
      ? `DATE_FORMAT(u.createdAt, '%Y-%u')` 
      : `DATE_FORMAT(u.createdAt, '%Y-%m')`;
  }

  private async buildGrowth(
    query: QueryStatsDto,
    from: Date,
    to: Date,
  ): Promise<{ data: GrowthDataPointDto[]; period: string }> {
    const driver = this.getDriver();
    const labelExpr = this.getLabelExpr(query.period ?? StatsPeriod.MONTH, driver);

    const rows: { label: string; count: string }[] = await this.userRepo
      .createQueryBuilder('u')
      .select(`${labelExpr}`, 'label')
      .addSelect('COUNT(*)', 'count')
      .where('u.createdAt BETWEEN :from AND :to', { from, to })
      .groupBy('label')
      .orderBy('label', 'ASC')
      .getRawMany();

    let cumulative = await this.userRepo.count({
      where: { createdAt: LessThan(from) },
    });

    const data: GrowthDataPointDto[] = rows.map((r) => {
      const add = Number(r.count);
      cumulative += add;
      return {
        label: r.label,
        newUsers: add,
        cumulativeTotal: cumulative,
      };
    });

    return { data, period: (query.period ?? StatsPeriod.MONTH).toLowerCase() };
  }

  private async buildByRole(total: number): Promise<{ breakdown: RoleStatItemDto[] }> {
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