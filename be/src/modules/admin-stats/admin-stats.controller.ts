/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminStatsService } from './admin-stats.service';
import { QueryStatsDto } from './dto/query-stats.dto';
import { UserStatsResponseDto } from './dto/stats-response.dto';

@ApiTags('Admin – Statistics')
@ApiBearerAuth()
@Controller('admin/stats')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)

export class AdminStatsController {
  constructor(private readonly statsService: AdminStatsService) { }

  @Get()
  @ApiOperation({ summary: 'Thống kê tổng quát cho admin (users + products)' })
  async getOverallStats(@Query() query: QueryStatsDto) {
    const userStats = await this.statsService.getUserStats(query);
    const productStats = await this.statsService.getProductStats(query);
    return {
      users: userStats,
      products: productStats,
    };
  }

  @Get('users')
  @ApiOperation({ summary: 'Thống kê toàn diện người dùng dành cho admin' })
  @ApiOkResponse({ type: UserStatsResponseDto })
  getUserStats(@Query() query: QueryStatsDto): Promise<UserStatsResponseDto> {
    return this.statsService.getUserStats(query);
  }
}
