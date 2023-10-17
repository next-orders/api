import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Shop } from '@api-sdk';

@Injectable()
export class ShopService {
  constructor(private readonly prisma: PrismaService) {}

  async findShopById(id: string): Promise<Shop | null> {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
      include: {
        domains: true,
        channels: true,
      },
    });
    if (!shop) {
      return null;
    }

    return shop;
  }
}
