/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type ClothingSlot = 'top' | 'bottom' | 'shoes' | 'hat' | 'fullbody';
export type Gender = 'male' | 'female' | 'unisex';

@Entity('clothing')
export class Clothing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ['top', 'bottom', 'shoes', 'hat', 'fullbody'],
  })
  slot: ClothingSlot;

  // Đường dẫn .glb trong /public FE — vd: "/models/clothing/shirt_001.glb"
  @Column({ length: 255 })
  modelPath: string;

  // Ảnh preview — vd: "/thumbnails/shirt_001.jpg"
  @Column({ length: 255, nullable: true })
  thumbnailPath: string;

  @Column({
    type: 'enum',
    enum: ['male', 'female', 'unisex'],
    default: 'unisex',
  })
  gender: Gender;

  // Mảng hex colors — vd: ["#ffffff","#1a1a2e"]
  @Column({ type: 'jsonb', default: [] })
  colors: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}