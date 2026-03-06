import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  // Tạo bài viết mới
  async create(data: Partial<Post>) {
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