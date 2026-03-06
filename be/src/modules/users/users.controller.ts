import { Controller, Get, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // Đường dẫn thực tế: /api/users (do prefix trong main.ts)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Patch(':id/status')
  toggleStatus(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.toggleStatus(id);
  }

  @Patch(':id/role')
  changeRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('role') role: 'user' | 'admin' | 'shop',
  ) {
    return this.usersService.changeRole(id, role);
  }
}