/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Param, Patch, Body, UsePipes, ValidationPipe, Delete, UseGuards, Req } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) { }

  @UseGuards(AuthGuard('jwt'))
  // @Patch('user') // hoàn thiện sửa người dùng
  update(@GetUser() user,
    @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.sub, updateUserDto);
  }

  @Delete(':id')
  remove(@GetUser() user) {
    return this.userService.remove(user.sub);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@Req() req ) {
    return req.user;
  }
}