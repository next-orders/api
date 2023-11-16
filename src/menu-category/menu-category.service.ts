import { Injectable } from '@nestjs/common';
import { MenuCategory } from '@api-sdk';
import { PrismaService } from '@/db/prisma.service';

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
}
