/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';
/* eslint-disable prettier/prettier */

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

  @Column({default : 1})
  isActive : boolean;

  @Column({ default: 'user' })
  role: 'user' | 'admin' | 'shop';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
}
