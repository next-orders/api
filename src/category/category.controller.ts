import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('list')
  listCategories() {
    return this.service.listCategories();
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const category = await this.service.findBySlug(slug);
    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }
}
