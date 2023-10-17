import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  // Product
  @Get('category/:id')
  findProductsInCategory(@Param('id') id: string) {
    return this.service.findProductsInCategory(id);
  }

  @Get('slug/:slug')
  async findProductBySlug(@Param('slug') slug: string) {
    const product = await this.service.findProductBySlug(slug);
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  @Get(':id')
  async findProductById(@Param('id') id: string) {
    const product = await this.service.findProductById(id);
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  @Post('create')
  async createProduct(@Body() dto: CreateProductDto) {
    return {
      ...dto,
    };
  }

  // ProductVariant
  @Get('variant/category/:id')
  findProductVariantsInCategory(@Param('id') id: string) {
    return this.service.findProductVariantsInCategory(id);
  }

  @Get('variant/:id')
  async findProductVariantById(@Param('id') id: string) {
    const product = await this.service.findProductVariantById(id);
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
