import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

<<<<<<< HEAD
  @Column({ nullable: true })
=======
  @Column({nullable : true})   
  firstName : string;

  @Column({nullable :true})   
  lastName : string;

  @Column()
>>>>>>> 4312d6179b418c70d7d5f75da24fd76d5ae06a21
  displayName: string;

  @Column({ select: false }) // Password sẽ không bị lộ khi dùng lệnh find() thông thường
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'user' })
  role: 'user' | 'admin' | 'shop';

  @CreateDateColumn()
  createdAt: Date;
}