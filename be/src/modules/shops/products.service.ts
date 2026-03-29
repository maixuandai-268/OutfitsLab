/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductStatus } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { PaginatedProductResponseDto } from './dto/product-response.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll(query: QueryProductDto): Promise<PaginatedProductResponseDto> {
    const {
      shop_id,
      search,
      status,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;

    const queryBuilder = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .leftJoinAndSelect('product.shop', 'shop'); // 🔥 THÊM: Lấy thông tin shop cho admin

    if (shop_id) {
      queryBuilder.andWhere('product.shop_id = :shop_id', { shop_id });
    }

    if (search) {
      queryBuilder.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (status) {
      queryBuilder.andWhere('product.status = :status', { status });
    }

    if (minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    // Cập nhật các trường cho phép sắp xếp (thêm rating)
    const allowedSortFields = ['name', 'price', 'salesCount', 'createdAt', 'rating'];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

    queryBuilder
      .orderBy(`product.${safeSortBy}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    const formattedData = data.map(product => {
      let avgRating = Number(product.rating) || 5.0; // Fallback to 5.0 explicitly if db returns 0 for a null rating
      if (product.reviews && product.reviews.length > 0) {
        avgRating = product.reviews.reduce((sum, rev) => sum + Number((rev as any).rating), 0) / product.reviews.length;
      }
      
      return {
        ...product,
        rating: Number(avgRating.toFixed(1)),
        reviewCount: product.reviews?.length || 0
      };
    });

    return {
      data: formattedData as Product[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['shop', 'shop.owner', 'shop.products','shop.products.reviews', 'reviews'],
    });

    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với ID: ${id}`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return { message: `Đã xóa sản phẩm "${product.name}" thành công` };
  }

  async updateStatus(id: number, status: ProductStatus): Promise<Product> {
    const product = await this.findOne(id);
    product.status = status;
    return await this.productRepository.save(product);
  }

  async incrementSalesCount(id: number, quantity: number = 1): Promise<Product> {
    const product = await this.findOne(id);
    product.salesCount = (product.salesCount || 0) + quantity;
    return await this.productRepository.save(product);
  }

  async incrementAffiliateClicks(id: number): Promise<Product> {
    const product = await this.findOne(id);
    product.affiliateClicks = (product.affiliateClicks || 0) + 1;
    return await this.productRepository.save(product);
  }
}