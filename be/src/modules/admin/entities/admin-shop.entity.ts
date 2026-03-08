import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shops') 
export class AdminShopEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shop_name: string;

  @Column({ default: 'pending' })
  status: string; 

  @Column({ nullable: true })
  reject_reason: string; 
}