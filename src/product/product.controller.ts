import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('category/:id')
  findProductsInCategory(@Param() id: string) {
    return this.service.findProductsInCategory(id);
  }
}
