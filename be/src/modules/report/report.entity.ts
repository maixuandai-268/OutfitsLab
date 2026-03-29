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
  userId: number; // ai gửi report

  @Column({ default: 'pending' })
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';

  @Column({ nullable: true })
  handledBy?: number; // Admin ID who is handling this report

  @Column({ type: 'timestamp', nullable: true })
  handledAt?: Date; // When the report was handled

  @Column('text', { nullable: true })
  note?: string; // Admin note about the resolution

  @CreateDateColumn()
  createdAt: Date;
}