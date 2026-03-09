/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum AnalyticsEventType {
  VIEW = 'view',
  FAVORITE = 'favorite',
  UNFAVORITE = 'unfavorite',
}

@Entity('product_analytics')
export class ProductAnalytics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column({
    type: 'enum',
    enum: AnalyticsEventType,
    default: AnalyticsEventType.VIEW,
  })
  eventType: AnalyticsEventType;

  @Column({ nullable: true, comment: 'IP hoặc session để deduplicate lượt xem' })
  sessionId: string;

  @CreateDateColumn()
  createdAt: Date;
}