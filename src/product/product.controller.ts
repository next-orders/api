import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

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
}
