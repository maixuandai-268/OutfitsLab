/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/mapped-types';
import { CreateShopDto } from './create-shop.dto';

// eslint-disable-next-line prettier/prettier
export class UpdateShopDto extends PartialType(CreateShopDto) {}