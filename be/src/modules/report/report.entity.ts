/* eslint-disable prettier/prettier */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('report')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  level: 'error' | 'warning' | 'info';

  @Column()
  target: 'all' | 'shop' | 'user';

  @Column({ nullable: true })
  targetId: string;

  @Column()
  userId: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';

  @Column({ nullable: true })
  handledBy?: number;

  @Column({ type: 'timestamp', nullable: true })
  handledAt?: Date;

  @Column('text', { nullable: true })
  note?: string;

  @CreateDateColumn()
  createdAt: Date;
}