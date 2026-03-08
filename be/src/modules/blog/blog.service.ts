import { Injectable, ConflictException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const existing = await this.blogRepository.findOne({ where: { slug: createBlogDto.slug } });
    if (existing) throw new ConflictException('Slug blog này đã tồn tại!');

    const newBlog = this.blogRepository.create(createBlogDto);
    return await this.blogRepository.save(newBlog);
  }

  async findAll() {
    return await this.blogRepository.find({ order: { createdAt: 'DESC' } });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
  const blog = await this.blogRepository.findOneBy({ id });
  if (!blog) {
    throw new NotFoundException(`Không tìm thấy Blog với id ${id}`);
  }
  
  Object.assign(blog, updateBlogDto);
  return await this.blogRepository.save(blog);
}
}