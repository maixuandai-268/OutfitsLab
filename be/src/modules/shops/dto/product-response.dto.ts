/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '../product.entity';

export class ProductResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Premium Blazer' })
  name: string;

  @ApiProperty({ example: 'https://example.com/images/blazer.jpg', nullable: true })
  image: string | null;

  @ApiProperty({ example: 99.99 })
  price: number;

  @ApiProperty({ example: 'Áo blazer cao cấp...', nullable: true })
  description: string | null;

  @ApiProperty({ example: 542 })
  salesCount: number;

  @ApiProperty({ enum: ProductStatus, example: ProductStatus.ACTIVE })
  status: ProductStatus;

  @ApiProperty({ example: '2024-01-15T08:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T08:00:00.000Z' })
  updatedAt: Date;
}

export class PaginatedProductResponseDto {
  @ApiProperty({ type: [ProductResponseDto] })
  data: ProductResponseDto[];

  @ApiProperty({ example: 245 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 25 })
  totalPages: number;
}