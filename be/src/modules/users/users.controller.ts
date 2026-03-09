import { Controller, Get, Post, Param, Patch, Body, UsePipes, ValidationPipe, Delete, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('blog')
export class UserController {
  constructor(private readonly userService : UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch('user')
  update(@GetUser() user,
   @Body() updateUserDto: UpdateUserDto) {
   return this.userService.update(user.sub, updateUserDto);
  }

   @Delete(':id')
    remove(@GetUser() user) {
    return this.userService.remove(user.sub);
  }
}