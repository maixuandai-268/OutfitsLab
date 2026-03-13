/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clothing } from './clothing.entity';
import { ClothingService } from './clothing.service';
import { ClothingController } from './clothing.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Clothing])],
  controllers: [ClothingController],
  providers: [ClothingService],
  exports: [ClothingService],
})
export class ClothingModule {}