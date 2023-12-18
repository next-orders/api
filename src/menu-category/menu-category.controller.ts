import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Permissions, Public } from '@/auth/auth.decorator';
import { MenuCategoryService } from '@/menu-category/menu-category.service';
import {
  CreateMenuCategoryDto,
  UpdateMenuCategoryDto,
} from '@/menu-category/dto';
import {
  MenuCategoryCreateResponse,
  MenuCategoryUpdateResponse,
} from '@api-sdk';

@Controller('menu-category')
export class MenuCategoryController {
  constructor(private readonly service: MenuCategoryService) {}

  @Permissions(['EDIT_MENUS'])
  @Post()
  async createCategory(
    @Body() dto: CreateMenuCategoryDto,
  ): Promise<MenuCategoryCreateResponse> {
    const category = await this.service.createCategory(dto);
    if (!category) {
      throw new BadRequestException();
    }

    return {
      ok: true,
      result: category,
    };
  }

  @Permissions(['EDIT_MENUS'])
  @Patch(':categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() dto: UpdateMenuCategoryDto,
  ): Promise<MenuCategoryUpdateResponse> {
    const category = await this.service.updateCategory(categoryId, dto);
    if (!category) {
      throw new BadRequestException();
    }

    return {
      ok: true,
      result: category,
    };
  }

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
