import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Menu } from '@api-sdk';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async findMenuById(id: string): Promise<Menu | null> {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            products: true,
          },
        },
      },
    });
    if (!menu) {
      return null;
    }

    return menu;
  }
}
