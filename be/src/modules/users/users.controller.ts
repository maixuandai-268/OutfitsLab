import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) { }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Req() req) {
    // FIX: Lấy id từ token và gọi findById để lấy data mới nhất có kèm Shop
    const userId = req.user.id || req.user.sub;
    return await this.userService.findById(userId);
  }
}