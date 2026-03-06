import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shop_name: string;

  @Column({ nullable: true })
  contact_email: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}