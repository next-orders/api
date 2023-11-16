import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { MenuCategoryService } from '@/menu-category/menu-category.service';
import { Public } from '@/auth/auth.decorator';

@Controller('menu-category')
export class MenuCategoryController {
  constructor(private readonly service: MenuCategoryService) {}

  @Public()
  @Get(':menuId/list')
  listMenuCategories(@Param('menuId') menuId: string) {
    return this.service.listMenuCategories(menuId);
  }

  @Public()
  @Get('slug/:slug')
  async findMenuCategoryBySlug(@Param('slug') slug: string) {
    const category = await this.service.findMenuCategoryBySlug(slug);
    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }
}
