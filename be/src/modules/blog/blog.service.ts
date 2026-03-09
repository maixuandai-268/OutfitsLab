/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly postRepository: Repository<Blog>,
  ) {}

  // Tạo bài viết mới
  async create(data: Partial<Blog>) {
    try {
      const newPost = this.postRepository.create(data);
      return await this.postRepository.save(newPost);
    } catch (error) {
      if (error.code === '23505') { // Mã lỗi duplicate slug trong Postgres
        throw new ConflictException('Slug này đã tồn tại rồi!');
      }
      throw error;
    }
  }

  // Lấy tất cả bài viết để hiển thị ra Next.js
  async findAll() {
    return await this.postRepository.find({
      order: { createdAt: 'DESC' }, // Bài mới nhất lên đầu
    });
  }
}