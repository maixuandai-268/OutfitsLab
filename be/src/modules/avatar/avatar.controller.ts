/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AvatarService } from './avatar.service';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import {
  CompatibilityQueryDto,
  CompatibilityResponseDto,
  GenderQueryDto,
} from './dto/avatar-query.dto';
import { Avatar } from './avatar.entity';

@ApiTags('Avatar')
@Controller('avatars')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}


  @Post()
  @ApiOperation({ summary: 'Đăng ký avatar model 3D mới' })
  @ApiCreatedResponse({ type: Avatar })
  create(@Body() dto: CreateAvatarDto): Promise<Avatar> {
    return this.avatarService.create(dto);
  }

  @Get('by-gender')
  @ApiOperation({
    summary: 'Lấy avatar theo gender — frontend gọi khi user chọn nam/nữ',
  })
  @ApiOkResponse({ type: Avatar })
  findByGender(@Query() query: GenderQueryDto): Promise<Avatar> {
    return this.avatarService.findByGender(query);
  }


  @Get()
  @ApiOperation({ summary: 'Danh sách tất cả avatars' })
  @ApiOkResponse({ type: [Avatar] })
  findAll(): Promise<Avatar[]> {
    return this.avatarService.findAll();
  }

  @Get(':id/compatibility')
  @ApiOperation({
    summary: 'Kiểm tra bones quần áo có compatible với avatar không',
    description:
      'Truyền vào danh sách tên bones từ file .glb quần áo. ' +
      'Trả về missingBones để biết cần sửa tên bone nào trong Blender.',
  })
  @ApiOkResponse({ type: CompatibilityResponseDto })
  checkCompatibility(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: CompatibilityQueryDto,
  ): Promise<CompatibilityResponseDto> {
    return this.avatarService.checkCompatibility(id, query);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết 1 avatar' })
  @ApiOkResponse({ type: Avatar })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Avatar> {
    return this.avatarService.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật avatar' })
  @ApiOkResponse({ type: Avatar })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAvatarDto,
  ): Promise<Avatar> {
    return this.avatarService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xoá avatar (soft delete)' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return this.avatarService.remove(id);
  }
}