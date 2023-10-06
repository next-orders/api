import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post('categories')
  @HttpCode(HttpStatus.OK)
  listCategories() {
    return this.service.listCategories();
  }
}
