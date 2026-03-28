import { Controller, Get, Patch, Param, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthRequest {
  user?: { id: number };
}

@Controller('notifications')
@UseGuards(JwtAuthGuard) // bảo vệ tất cả route, cần đăng nhập
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // GET /api/notifications → lấy thông báo của user đang đăng nhập
  @Get()
  getMyNotifications(@Req() req: AuthRequest) {
    const userId = req.user?.id as number;
    return this.notificationService.findAllByUser(userId);
  }

  // PATCH /api/notifications/:id/read → đánh dấu 1 thông báo đã đọc
  @Patch(':id/read')
  markAsRead(@Param('id') id: number, @Req() req: AuthRequest) {
    const userId = req.user?.id as number;
    return this.notificationService.markAsRead(id, userId);
  }

  // PATCH /api/notifications/read-all → đánh dấu tất cả đã đọc
  @Patch('read-all')
  markAllAsRead(@Req() req: AuthRequest) {
    const userId = req.user?.id as number;
    return this.notificationService.markAllAsRead(userId);
  }
}
