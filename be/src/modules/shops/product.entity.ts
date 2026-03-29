/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Shop } from './shop.entity';
import { Review } from '../reviews/review.entity';

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  shop_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 0 })
  salesCount: number;

  @Column('decimal', { precision: 3, scale: 1, default: 5.0 })
  rating: number;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
  })
  status: ProductStatus;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  tag: string;

  // Cập nhật/Thêm các cột mới ở đây
  @Column({ nullable: true })
  affiliateLink: string;

  @Column({ nullable: true })
  model3DUrl: string; // 🔥 Lưu đường dẫn file 3D

  @Column({ default: false })
  is3DGenerated: boolean; // 🔥 Đánh dấu trạng thái 3D

  @Column({ default: 0 })
  affiliateClicks: number;

  @Column({ default: 0 })
  viewCount: number;

  @Column('jsonb', { nullable: true, default: [] })
  colors: string[];

  @Column('jsonb', { nullable: true, default: [] })
  sizes: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Shop, (shop) => shop.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}