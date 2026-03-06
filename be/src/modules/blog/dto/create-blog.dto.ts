import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty({ message: 'Tiêu đề blog không được để trống' })
  @MinLength(5, { message: 'Tiêu đề phải từ 5 ký tự trở lên' })
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}