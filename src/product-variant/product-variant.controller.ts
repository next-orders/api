import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ProductVariantService } from '@/product-variant/product-variant.service';
import { Permissions, Public } from '@/auth/auth.decorator';
import { CreateProductVariantDto } from '@/product-variant/dto/create-product-variant.dto';

@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly service: ProductVariantService) {}

  @Public()
  @Get('category/:id')
  findProductVariantsInCategory(@Param('id') id: string) {
    return this.service.findProductVariantsInCategory(id);
  }

  @Public()
  @Get('slug/:slug')
  async findProductVariantBySlug(@Param('slug') slug: string) {
    const product = await this.service.findProductVariantBySlug(slug);
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  @Permissions(['EDIT_PRODUCTS'])
  @Post()
  async createProductVariant(@Body() dto: CreateProductVariantDto) {
    const product = await this.service.createProductVariant(dto);
    if (!product) {
      throw new BadRequestException();
    }

    return product;
  }

  @Public()
  @Get(':id')
  async findProductVariantById(@Param('id') id: string) {
    const product = await this.service.findProductVariantById(id);
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
