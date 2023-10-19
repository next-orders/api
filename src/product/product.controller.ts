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

  @Get('category/:id')
  findProductsInCategory(@Param('id') id: string) {
    return this.service.findProductsInCategory(id);
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
}
