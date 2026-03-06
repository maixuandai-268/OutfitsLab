import { IsNotEmpty, IsString, IsOptional, IsUrl, MaxLength, IsEmail } from 'class-validator';

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  shop_name: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  avatar_url?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  contact_email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;
}