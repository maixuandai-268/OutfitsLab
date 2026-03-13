/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Clothing } from './clothing.entity';
import { CreateClothingDto } from './dto/create-clothing.dto';
import { UpdateClothingDto } from './dto/update-clothing.dto';
import { QueryClothingDto } from './dto/query-clothing.dto';
import { ViewerQueryDto, ViewerClothingResponseDto } from './dto/viewer-clothing.dto';

@Injectable()
export class ClothingService {
  constructor(
    @InjectRepository(Clothing)
    private readonly clothingRepo: Repository<Clothing>,
  ) {}

  async create(dto: CreateClothingDto): Promise<Clothing> {
    if (!dto.modelPath.endsWith('.glb') && !dto.modelPath.endsWith('.gltf')) {
      throw new BadRequestException('modelPath phải là file .glb hoặc .gltf');
    }

    const clothing = this.clothingRepo.create({
      ...dto,
      colors: dto.colors ?? [],
      price:  dto.price  ?? 0,
      gender: dto.gender ?? 'unisex',
    });

    return this.clothingRepo.save(clothing);
  }

  findAll(query: QueryClothingDto): Promise<Clothing[]> {
    const where: FindOptionsWhere<Clothing> = {
      isActive: query.isActive !== undefined ? query.isActive : true,
    };

    if (query.slot)   where.slot   = query.slot;
    if (query.gender) where.gender = query.gender;

    return this.clothingRepo.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Clothing> {
    const clothing = await this.clothingRepo.findOneBy({ id });
    if (!clothing) {
      throw new NotFoundException(`Clothing "${id}" không tồn tại`);
    }
    return clothing;
  }

  async update(id: string, dto: UpdateClothingDto): Promise<Clothing> {
    const clothing = await this.findOne(id);
    Object.assign(clothing, dto);
    return this.clothingRepo.save(clothing);
  }

  async remove(id: string): Promise<{ message: string }> {
    const clothing = await this.findOne(id);
    clothing.isActive = false;
    await this.clothingRepo.save(clothing);
    return { message: `Đã xoá sản phẩm "${clothing.name}"` };
  }

  async findForViewer(query: ViewerQueryDto): Promise<ViewerClothingResponseDto[]> {
    const qb = this.clothingRepo
      .createQueryBuilder('c')
      .where('c.isActive = :active', { active: true });

    if (query.slot) {
      qb.andWhere('c.slot = :slot', { slot: query.slot });
    }

    if (query.gender) {
      qb.andWhere('(c.gender = :gender OR c.gender = :unisex)', {
        gender: query.gender,
        unisex: 'unisex',
      });
    }

    const items = await qb.orderBy('c.createdAt', 'DESC').getMany();

    return items.map((item) => ({
      id: item.id,
      name: item.name,
      slot: item.slot,
      modelUrl: item.modelPath,
      thumbnailUrl: item.thumbnailPath ?? null,
      colors: item.colors,
      price: Number(item.price),
    }));
  }
}