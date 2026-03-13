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
import { ClothingService } from './clothing.service';
import { CreateClothingDto } from './dto/create-clothing.dto';
import { UpdateClothingDto } from './dto/update-clothing.dto';
import { QueryClothingDto } from './dto/query-clothing.dto';
import { ViewerQueryDto, ViewerClothingResponseDto } from './dto/viewer-clothing.dto';
import { Clothing } from './clothing.entity';

@ApiTags('Clothing')
@Controller('clothing')
export class ClothingController {
  constructor(private readonly clothingService: ClothingService) {}

 
  @Post()
  @ApiOperation({ summary: 'Tạo sản phẩm quần áo mới' })
  @ApiCreatedResponse({ type: Clothing })
  create(@Body() dto: CreateClothingDto): Promise<Clothing> {
    return this.clothingService.create(dto);
  }

 
  @Get('viewer')
  @ApiOperation({
    summary: 'Lấy sản phẩm theo format cho 3D viewer (frontend Three.js dùng)',
  })
  @ApiOkResponse({ type: [ViewerClothingResponseDto] })
  findForViewer(
    @Query() query: ViewerQueryDto,
  ): Promise<ViewerClothingResponseDto[]> {
    return this.clothingService.findForViewer(query);
  }


  @Get()
  @ApiOperation({ summary: 'Danh sách sản phẩm (dùng cho admin)' })
  @ApiOkResponse({ type: [Clothing] })
  findAll(@Query() query: QueryClothingDto): Promise<Clothing[]> {
    return this.clothingService.findAll(query);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết 1 sản phẩm' })
  @ApiOkResponse({ type: Clothing })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Clothing> {
    return this.clothingService.findOne(id);
  }

 
  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật sản phẩm' })
  @ApiOkResponse({ type: Clothing })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateClothingDto,
  ): Promise<Clothing> {
    return this.clothingService.update(id, dto);
  }


  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xoá sản phẩm (soft delete)' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
    return this.clothingService.remove(id);
  }
}