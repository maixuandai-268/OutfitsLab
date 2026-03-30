/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductStatus } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { PaginatedProductResponseDto } from './dto/product-response.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly notificationsService: NotificationsService,
  ) { }


  async create(createProductDto: CreateProductDto): Promise<Product> {
    if (createProductDto.shopId && !createProductDto.shop_id) {
      createProductDto.shop_id = createProductDto.shopId;
    }

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
      shopId,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;

    const queryBuilder = this.productRepository.createQueryBuilder('product');

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

    if (query.colors?.length) {
      queryBuilder.andWhere('product.colors @> :colors', {
        colors: JSON.stringify(query.colors),
      });
    }

    if (query.sizes?.length) {
      queryBuilder.andWhere('product.sizes @> :sizes', {
        sizes: JSON.stringify(query.sizes),
      });
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

    const productsWithStats = data.map(product => {
      const reviewCount = product.reviews?.length || 0;
      const averageRating =
        reviewCount > 0
          ? Number(
            (
              product.reviews.reduce((acc, r) => acc + r.rating, 0) /
              reviewCount
            ).toFixed(1),
          )
          : 0;

      const { reviews, ...productInfo } = product;
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


  async findOne(id: number, relations: any = {}): Promise<any> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: Object.keys(relations).length > 0 ? relations : {
        shop: {
          products: {
            reviews: true
          }
        },
        reviews: true
      }
    });

    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với ID: ${id}`);
    }

    const reviewCount = product.reviews?.length || 0;
    const averageRating = reviewCount > 0
      ? Number(
          (
            product.reviews.reduce((acc, r) => acc + r.rating, 0) /
            reviewCount
          ).toFixed(1),
        )
      : 0;

    let shopInfo: any = null;
    if (product.shop) {
      const shopProducts = product.shop.products || [];
      const shopProductCount = shopProducts.length;

      let totalShopRating = 0;
      let totalShopReviews = 0;

      shopProducts.forEach(p => {
        const pReviews = p.reviews || [];
        pReviews.forEach(r => {
          totalShopRating += Number(r.rating);
          totalShopReviews++;
        });
      });

      const shopAverageRating = totalShopReviews > 0
        ? Number((totalShopRating / totalShopReviews).toFixed(1))
        : 5.0;

      const { products, ...baseShopInfo } = product.shop;
      shopInfo = {
        ...baseShopInfo,
        productCount: shopProductCount,
        rating: shopAverageRating,
        reviewCount: totalShopReviews
      };
    }

    const { reviews, shop, ...productInfo } = product;
    return {
      ...productInfo,
      averageRating,
      reviewCount,
      shop: shopInfo,
      reviews: reviews || []
    };
  }


  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id, ['shop']);
    Object.assign(product, updateProductDto);

    const updated = await this.productRepository.save(product);

    if (updated.shop?.ownerId) {
      await this.notificationsService.create({
        userId: updated.shop.ownerId,
        message: `Sản phẩm "${updated.name}" đã được cập nhật`,
      });
    }

    return updated;
  }


  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id, ['shop']);
    await this.productRepository.remove(product);

    if (product.shop?.ownerId) {
      await this.notificationsService.create({
        userId: product.shop.ownerId,
        message: `Sản phẩm "${product.name}" đã bị xóa`,
      });
    }

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


  async incrementAffiliateClicks(id: number): Promise<void> {
    await this.productRepository.increment({ id }, 'affiliateClicks', 1);
  }
}