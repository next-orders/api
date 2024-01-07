import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Menu, ProductVariant } from '@api-sdk';
import { ProductVariantService } from '@/core/product-variant/product-variant.service';

@Injectable()
export class MenuService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productVariant: ProductVariantService,
  ) {}

  async findAllMenusInChannel(channelId: string): Promise<Menu[] | null> {
    const menus = await this.prisma.menu.findMany({
      where: { channelId },
      include: {
        categories: true,
      },
    });
    if (!menus) {
      return null;
    }

    return menus as Menu[];
  }

  async findMenuById(id: string): Promise<Menu | null> {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    });
    if (!menu) {
      return null;
    }

    return menu as Menu;
  }

  async getTopSearchOnMenu(menuId: string): Promise<ProductVariant[] | null> {
    return this.productVariant.findPopularProductVariantsByMenuId(menuId);
  }

  async searchOnMenu(
    menuId: string,
    query: string,
  ): Promise<ProductVariant[] | null> {
    if (query.length < 2) {
      return null;
    }

    return this.productVariant.findProductVariantByNameAndMenuId(menuId, query);
  }
}
