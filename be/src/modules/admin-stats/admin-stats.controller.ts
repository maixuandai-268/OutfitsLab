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
  constructor(private readonly statsService: AdminStatsService) {}

  @Get('users')
  @ApiOperation({ summary: 'Thống kê toàn diện người dùng dành cho admin' })
  @ApiOkResponse({ type: UserStatsResponseDto })
  getUserStats(@Query() query: QueryStatsDto): Promise<UserStatsResponseDto> {
    return this.statsService.getUserStats(query);
  }
}
