import { Injectable } from '@nestjs/common';
import { Menu, ProductVariant } from '@api-sdk';
import { ProductVariantService } from '@/core/product-variant/product-variant.service';
import { CreateMenuDto } from '@/core/menu/dto/create-menu.dto';
import { MenuRepository } from '@/core/menu/menu.repository';
import { MenuEntity } from '@/core/menu/entities';

@Injectable()
export class MenuService {
  constructor(
    private readonly repository: MenuRepository,
    private readonly productVariant: ProductVariantService,
  ) {}

  async create(dto: CreateMenuDto) {
    const newMenuEntity = new MenuEntity({
      name: dto.name,
      channelId: dto.channelId,
    });

    return this.repository.create(newMenuEntity);
  }

  async findAllMenusInChannel(channelId: string): Promise<Menu[] | null> {
    const menus = await this.repository.findAllByChannelId(channelId);
    if (!menus) {
      return null;
    }

    return menus;
  }

  findMenuById(id: string): Promise<Menu | null> {
    return this.repository.findById(id);
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
