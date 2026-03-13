/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type AvatarGender = 'male' | 'female';

@Entity('avatars')
export class Avatar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'enum', enum: ['male', 'female'] })
  gender: AvatarGender;


  @Column({ length: 255 })
  modelPath: string;

  @Column({ length: 255, nullable: true })
  thumbnailPath: string;


  @Column({ length: 20, default: 'v1' })
  version: string;

  @Column({ length: 50, default: 'mixamo' })
  boneConvention: string;


  @Column({ type: 'jsonb', default: [] })
  boneNames: string[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}