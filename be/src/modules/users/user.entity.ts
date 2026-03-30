/* eslint-disable prettier/prettier */
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToOne, 
  OneToMany 
} from 'typeorm';
import { Shop } from '../shops/shop.entity'; 
import { Notification } from '../notifications/notification.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()   
  email : string;

  @Column({nullable : true})   
  firstName : string;

  @Column({nullable :true})   
  lastName : string;

  @Column()
  displayName: string;

  @Column({ unique: true , nullable : true })
  avatarUrl: string;

  @Column({select:false})
  password : string;

  @Column({nullable : true})
  bio : string;

  @Column({nullable : true})
  phone : string;

  @Column({default : true}) // Sửa lại kiểu dữ liệu boolean chuẩn
  isActive : boolean;

  @Column({ default: 'user' })
  role: 'user' | 'admin' | 'shop';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Shop, (shop) => shop.owner)
  shop: Shop;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}