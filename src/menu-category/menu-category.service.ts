import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { MenuCategory } from '@api-sdk';
import { PrismaService } from '@/db/prisma.service';
import { CreateMenuCategoryDto } from '@/menu-category/dto/create-menu-category.dto';

@Injectable()
export class MenuCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async listMenuCategories(menuId: string): Promise<MenuCategory[]> {
    return this.prisma.menuCategory.findMany({
      where: { menuId },
    });
  }

  async findMenuCategoryBySlug(slug: string): Promise<MenuCategory | null> {
    return this.prisma.menuCategory.findFirst({
      where: { slug },
    });
  }

  async createCategory(
    dto: CreateMenuCategoryDto,
  ): Promise<MenuCategory | null> {
    const category = await this.prisma.menuCategory.create({
      data: {
        id: createId(),
        menuId: dto.menuId,
        name: dto.name,
        slug: dto.slug,
      },
    });

    if (!category) {
      return null;
    }

    return category;
  }
}
