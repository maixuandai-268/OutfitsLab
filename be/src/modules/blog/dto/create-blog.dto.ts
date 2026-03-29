import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty({ message: 'Tiêu đề blog không được để trống' })
  @MinLength(5)
  title: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  excerpt: string;
}