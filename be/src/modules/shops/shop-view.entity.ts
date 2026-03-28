/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

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
}
