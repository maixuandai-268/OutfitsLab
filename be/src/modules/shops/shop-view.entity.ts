/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Shop } from './shop.entity'; 

@Entity('shop_views')
export class ShopView {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shopId: number;

  @Column({ nullable: true, comment: 'IP hoặc session để tránh duplicate' })
  sessionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Shop, (shop) => shop.id, { 
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'shopId' })
  shop: Shop;
}