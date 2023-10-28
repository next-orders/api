import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ProductVariantService } from '@/product-variant/product-variant.service';
import { Public } from '@/auth/auth.decorator';

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
