import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { MenuCategoryService } from '@/menu-category/menu-category.service';

@Controller('menu-category')
export class MenuCategoryController {
  constructor(private readonly service: MenuCategoryService) {}

  @Get('list')
  listMenuCategories() {
    return this.service.listMenuCategories();
  }

  @Get('slug/:slug')
  async findMenuCategoryBySlug(@Param('slug') slug: string) {
    const category = await this.service.findMenuCategoryBySlug(slug);
    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }
}
