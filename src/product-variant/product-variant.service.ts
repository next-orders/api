import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { ProductVariant } from '@api-sdk';
import { changeMediaInProductVariant } from '@/lib/helpers';

@Injectable()
export class ProductVariantService {
  constructor(private readonly prisma: PrismaService) {}

  async findProductVariantsInCategory(
    categoryId: string,
  ): Promise<ProductVariant[] | null> {
    const products = await this.prisma.productVariant.findMany({
      where: { categoryId },
      include: {
        category: true,
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

    return changeMediaInProductVariant(products);
  }

  async findProductVariantBySlug(slug: string): Promise<ProductVariant | null> {
    const product = await this.prisma.productVariant.findFirst({
      where: { slug },
      include: {
        category: true,
        media: {
          include: {
            media: true,
          },
        },
      },
    });
    if (!product) {
      return null;
    }

    const productVariants = changeMediaInProductVariant([product]);

    return productVariants[0];
  }

  async findProductVariantById(id: string): Promise<ProductVariant | null> {
    const product = await this.prisma.productVariant.findUnique({
      where: { id },
      include: {
        category: true,
        media: {
          include: {
            media: true,
          },
        },
      },
    });
    if (!product) {
      return null;
    }

    const productVariants = changeMediaInProductVariant([product]);

    return productVariants[0];
  }
}
