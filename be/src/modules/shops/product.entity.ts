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

  @Column({ nullable: true })
  affiliateLink: string;

  @Column({ default: 0 })
  affiliateClicks: number;

  @Column('jsonb', { nullable: true, default: [] })
  colors: string[];

  @Column('jsonb', { nullable: true, default: [] })
  sizes: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Shop, (shop) => shop.products)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}