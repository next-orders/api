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
import { Public } from '@/auth/auth.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Public()
  @Get('category/:id')
  findProductsInCategory(@Param('id') id: string) {
    return this.service.findProductsInCategory(id);
  }

  @Public()
  @Get('list')
  async findProducts() {
    const products = await this.service.findProducts();
    if (!products) {
      throw new NotFoundException();
    }

    return products;
  }

  @Public()
  @Get(':id')
  async findProductById(@Param('id') id: string) {
    const product = await this.service.findProductById(id);
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  @Public()
  @Post('create')
  async createProduct(@Body() dto: CreateProductDto) {
    return {
      ...dto,
    };
  }
}
