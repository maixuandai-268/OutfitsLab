import {
  Controller,
  Post,
  Delete,
  Patch,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { fileFilter } from '../../common/filters/file.filter';
import { DeleteFileDto } from './dto/delete-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadFile(file);
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter,
      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  )
  async uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadService.uploadMultiple(files);
  }

  @Patch()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  )
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateFileDto,
  ) {
    return this.uploadService.updateFile(
      file,
      body.old_public_id,
      body.resource_type,
    );
  }

  @Delete()
  async delete(@Body() body: DeleteFileDto) {
    return this.uploadService.deleteFile(
      body.public_id,
      body.resource_type || 'image',
    );
  }
}