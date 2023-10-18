import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { ProductVariant } from '@api-sdk';

@Injectable()
export class ProductVariantService {
  constructor(private readonly prisma: PrismaService) {}

  async findProductVariantsInCategory(
    categoryId: string,
  ): Promise<ProductVariant[] | null> {
    const products = await this.prisma.productVariant.findMany({
      where: { categoryId },
      include: {
        media: {
          include: {
            media: true,
          },
        },
      },
    });
    if (!products) {
      return null;
    }

    return products;
  }

  async findProductVariantById(id: string): Promise<ProductVariant | null> {
    return this.prisma.productVariant.findUnique({
      where: { id },
      include: {
        media: {
          include: {
            media: true,
          },
        },
      },
    });
  }
}
