/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  create(data: Partial<User>) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  findByEmailWithPassword(email: string) {
  return this.userRepo
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', { email })
    .getOne();
}
}