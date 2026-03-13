/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avatar } from './avatar.entity';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import {
  CompatibilityQueryDto,
  CompatibilityResponseDto,
  GenderQueryDto,
} from './dto/avatar-query.dto';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarRepo: Repository<Avatar>,
  ) {}

  create(dto: CreateAvatarDto): Promise<Avatar> {
    const avatar = this.avatarRepo.create({
      ...dto,
      version: dto.version ?? 'v1',
      boneConvention: dto.boneConvention ?? 'mixamo',
      boneNames: dto.boneNames ?? [],
    });
    return this.avatarRepo.save(avatar);
  }

  findAll(): Promise<Avatar[]> {
    return this.avatarRepo.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Avatar> {
    const avatar = await this.avatarRepo.findOneBy({ id });
    if (!avatar) throw new NotFoundException(`Avatar "${id}" không tồn tại`);
    return avatar;
  }

 
  async findByGender(query: GenderQueryDto): Promise<Avatar> {
    const avatar = await this.avatarRepo.findOne({
      where: { gender: query.gender, isActive: true },
      order: { createdAt: 'DESC' }, 
    });
    if (!avatar) {
      throw new NotFoundException(`Không có avatar cho gender "${query.gender}"`);
    }
    return avatar;
  }

  async update(id: string, dto: UpdateAvatarDto): Promise<Avatar> {
    const avatar = await this.findOne(id);
    Object.assign(avatar, dto);
    return this.avatarRepo.save(avatar);
  }

  async remove(id: string): Promise<{ message: string }> {
    const avatar = await this.findOne(id);
    avatar.isActive = false;
    await this.avatarRepo.save(avatar);
    return { message: `Đã xoá avatar "${avatar.name}"` };
  }

  async checkCompatibility(
    id: string,
    dto: CompatibilityQueryDto,
  ): Promise<CompatibilityResponseDto> {
    const avatar = await this.findOne(id);
    const avatarBoneSet = new Set(avatar.boneNames);
    const missingBones = dto.bones.filter((bone) => !avatarBoneSet.has(bone));

    return {
      compatible:   missingBones.length === 0,
      missingBones,
    };
  }
}