/* eslint-disable prettier/prettier */
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,  
  OneToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from './product.entity';

@Entity('shops')
export class Shop {
  @Column({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: number;

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

  @OneToOne(() => User, (user: any) => user.shop)
  @JoinColumn({ name: 'ownerId' }) 
  owner: User;

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];
}