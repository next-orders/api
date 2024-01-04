import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Menu } from '@api-sdk';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

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
}
