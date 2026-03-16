import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  displayName: string;

  @IsString()
  password: string;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  avatarUrl?: string;

  @IsString()
  bio?: string;

  @IsString()
  phone?: string;

}