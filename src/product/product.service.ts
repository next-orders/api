import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Product, ProductVariant } from '@api-sdk';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findProductById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        variants: {
          include: {
            media: true,
          },
        },
      },
    });
  }

  async findProductBySlug(slug: string): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: { slug },
      include: {
        category: true,
        variants: {
          include: {
            media: true,
          },
        },
      },
    });
  }

  /** List of the shop's products */
  async findProductsInCategory(categoryId: string): Promise<Product[] | null> {
    const products = await this.prisma.product.findMany({
      where: { categoryId },
      include: {
        category: true,
        variants: {
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
