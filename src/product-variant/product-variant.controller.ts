import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ProductVariantService } from '@/product-variant/product-variant.service';

@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly service: ProductVariantService) {}

  @Get('category/:id')
  findProductVariantsInCategory(@Param('id') id: string) {
    return this.service.findProductVariantsInCategory(id);
  }

  @Get('slug/:slug')
  async findProductVariantBySlug(@Param('slug') slug: string) {
    const product = await this.service.findProductVariantBySlug(slug);
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  @Get(':id')
  async findProductVariantById(@Param('id') id: string) {
    const product = await this.service.findProductVariantById(id);
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
