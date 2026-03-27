import { Controller, Get, Post, Body, Param, Request, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(req.user.id, createReviewDto);
  }

  @Get('product/:productId')
  findAllByProductId(@Param('productId', ParseIntPipe) productId: number) {
    return this.reviewsService.findAllByProductId(productId);
  }

  @Get('product/:productId/rating')
  getAverageRating(@Param('productId', ParseIntPipe) productId: number) {
    return this.reviewsService.getAverageRating(productId);
  }
}
