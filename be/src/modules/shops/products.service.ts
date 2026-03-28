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
  ) { }

  // 1. Tạo sản phẩm mới
  async create(createProductDto: CreateProductDto): Promise<Product> {
    if (createProductDto.shopId && !createProductDto.shop_id) {
      createProductDto.shop_id = createProductDto.shopId;
    }
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  // 2. Lấy danh sách sản phẩm (Có lọc theo shop_id và phân trang)
  async findAll(query: QueryProductDto): Promise<PaginatedProductResponseDto> {
    const {
      shop_id,
      search,
      status,
      minPrice,
      maxPrice,
      shopId,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    // Lọc theo shop_id (Hỗ trợ cả shop_id và shopId từ frontend)
    const effectiveShopId = shop_id || shopId;
    if (effectiveShopId) {
      queryBuilder.andWhere('product.shop_id = :effectiveShopId', { effectiveShopId });
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

    if (query.type) {
      queryBuilder.andWhere('product.type = :type', { type: query.type });
    }

    if (query.brand) {
      queryBuilder.andWhere('product.brand ILIKE :brand', { brand: `%${query.brand}%` });
    }

    if (query.tag) {
      queryBuilder.andWhere('product.tag = :tag', { tag: query.tag });
    }

    // Lọc theo mảng JSONB
    if (query.colors && Array.isArray(query.colors) && query.colors.length > 0) {
      queryBuilder.andWhere('product.colors @> :colors', { colors: JSON.stringify(query.colors) });
    }

    if (query.sizes && Array.isArray(query.sizes) && query.sizes.length > 0) {
      queryBuilder.andWhere('product.sizes @> :sizes', { sizes: JSON.stringify(query.sizes) });
    }

    const allowedSortFields = ['name', 'price', 'salesCount', 'createdAt'];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

    queryBuilder
      .leftJoinAndSelect('product.shop', 'shop')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .orderBy(`product.${safeSortBy}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    // Map to include review stats
    const productsWithStats = data.map(product => {
      const reviewCount = product.reviews?.length || 0;
      const averageRating = reviewCount > 0 
        ? Number((product.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1))
        : 0;
      
      const { reviews, ...productInfo } = product; // Remove raw reviews array to keep response clean
      return {
        ...productInfo,
        reviewCount,
        averageRating,
      };
    });

    return {
      data: productsWithStats,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // 3. Lấy chi tiết 1 sản phẩm
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với ID: ${id}`);
    }
    return product;
  }

  // 4. Cập nhật sản phẩm
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  // 5. Xóa sản phẩm
  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return { message: `Đã xóa sản phẩm "${product.name}" thành công` };
  }

  // 6. Cập nhật trạng thái (HÀM BẠN ĐANG THIẾU)
  async updateStatus(id: number, status: ProductStatus): Promise<Product> {
    const product = await this.findOne(id);
    product.status = status;
    return await this.productRepository.save(product);
  }

  // 7. Tăng số lượng đã bán
  async incrementSalesCount(id: number, quantity: number = 1): Promise<Product> {
    const product = await this.findOne(id);
    product.salesCount = (product.salesCount || 0) + quantity;
    return await this.productRepository.save(product);
  }

  // 8. Tăng số lượt click affiliate
  async incrementAffiliateClicks(id: number): Promise<void> {
    await this.productRepository.increment({ id }, 'affiliateClicks', 1);
  }
}