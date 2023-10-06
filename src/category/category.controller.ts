import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { FindCategoryDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('list')
  listCategories() {
    return this.service.listCategories();
  }

  @Post('find')
  findCategory(@Body() dto: FindCategoryDto) {
    return this.service.findCategory(dto);
  }
}
