/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class UserOverviewDto {
  @ApiProperty({ example: 120, description: 'Tổng số người dùng' })
  @Expose() total: number;

  @ApiProperty({ example: 95, description: 'Đang hoạt động (isActive = true)' })
  @Expose() active: number;

  @ApiProperty({ example: 25, description: 'Không hoạt động (isActive = false)' })
  @Expose() inactive: number;

  @ApiProperty({ example: 14, description: 'Người dùng mới trong kỳ được chọn' })
  @Expose() newInPeriod: number;

  @ApiProperty({ example: 11.67, description: 'Tăng trưởng so với kỳ trước (%)' })
  @Expose() growthRate: number;
}

export class GrowthDataPointDto {
  @ApiProperty({ example: '2025-03' })
  @Expose() label: string;

  @ApiProperty({ example: 14, description: 'Số người đăng ký mới' })
  @Expose() newUsers: number;

  @ApiProperty({ example: 108, description: 'Tổng luỹ kế đến thời điểm này' })
  @Expose() cumulativeTotal: number;
}

export class UserGrowthDto {
  @ApiProperty({ type: [GrowthDataPointDto] })
  @Expose()
  @Type(() => GrowthDataPointDto)
  data: GrowthDataPointDto[];

  @ApiProperty({ example: 'month' })
  @Expose() period: string;
}

export class RoleStatItemDto {
  @ApiProperty({ example: 'user', enum: ['user', 'admin', 'shop'] })
  @Expose() role: string;

  @ApiProperty({ example: 100 })
  @Expose() count: number;

  @ApiProperty({ example: 83.33, description: 'Phần trăm trong tổng số (%)' })
  @Expose() percentage: number;
}

export class UsersByRoleDto {
  @ApiProperty({ type: [RoleStatItemDto] })
  @Expose()
  @Type(() => RoleStatItemDto)
  breakdown: RoleStatItemDto[];
}

export class StatusStatItemDto {
  @ApiProperty({ example: 'active', enum: ['active', 'inactive'] })
  @Expose() status: 'active' | 'inactive';

  @ApiProperty({ example: 95 })
  @Expose() count: number;

  @ApiProperty({ example: 79.17 })
  @Expose() percentage: number;
}

export class UsersByStatusDto {
  @ApiProperty({ type: [StatusStatItemDto] })
  @Expose()
  @Type(() => StatusStatItemDto)
  breakdown: StatusStatItemDto[];
}

export class UserStatsResponseDto {
  @ApiProperty({ type: UserOverviewDto })
  @Expose()
  @Type(() => UserOverviewDto)
  overview: UserOverviewDto;

  @ApiProperty({ type: UserGrowthDto })
  @Expose()
  @Type(() => UserGrowthDto)
  growth: UserGrowthDto;

  @ApiProperty({ type: UsersByRoleDto })
  @Expose()
  @Type(() => UsersByRoleDto)
  byRole: UsersByRoleDto;

  @ApiProperty({ type: UsersByStatusDto })
  @Expose()
  @Type(() => UsersByStatusDto)
  byStatus: UsersByStatusDto;

  @ApiProperty({ example: '2025-03-13T07:00:00Z' })
  @Expose() computedAt: Date;
}