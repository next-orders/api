import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import type { Shop } from '@api-sdk';

@Injectable()
export class ShopService {
  constructor(private readonly prisma: PrismaService) {}

  async getShopData(): Promise<Shop | null> {
    const shop = await this.prisma.shop.findFirst({
      include: {
        domains: true,
        channels: {
          include: {
            menus: {
              include: {
                categories: true,
              },
            },
          },
        },
      },
    });
    if (!shop) {
      return null;
    }

    return shop;
  }
}
