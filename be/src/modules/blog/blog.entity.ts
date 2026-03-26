import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('blogs') 
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  content: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: 'Thời trang' })
  category: string;

  @Column({ default: 'Admin' })
  author: string;

  @CreateDateColumn()
  createdAt: Date;
}