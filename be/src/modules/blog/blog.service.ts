/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepo : Repository<Blog>,
  ) {}

  // Tạo bài viết mới
  async create(data: Partial<Blog>) {
    try {
      const newPost = this.blogRepo.create(data);
      return await this.blogRepo.save(newPost);
    } catch (error) {
      if (error.code === '23505') { // Mã lỗi duplicate slug trong Postgres
        throw new ConflictException('Slug này đã tồn tại rồi!');
      }
      throw error;
    }
  }

  // Lấy tất cả bài viết để hiển thị ra Next.js
  async findAll() {
    return await this.blogRepo.find({ order: { createdAt: 'DESC' } });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto)  {
  const blog = await this.blogRepo.findOneBy({ id });
  if (!blog) {
    throw new BadRequestException(`Không tìm thấy Blog với id ${id}`);
  }
  
  Object.assign(blog, updateBlogDto);
  return await this.blogRepo.save(blog);
}
}