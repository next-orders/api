import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Product } from '@api-sdk';
import { changeMediaInProductVariant } from '@/lib/helpers';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findProductById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        variants: {
          include: {
            category: true,
            media: {
              include: {
                media: true,
              },
            },
          },
        },
      },
    });
    if (!product) {
      return null;
    }

    const productVariantsPrepared = changeMediaInProductVariant(
      product.variants,
    );

    return {
      ...product,
      variants: productVariantsPrepared,
    };
  }

  async findProductBySlug(slug: string): Promise<Product | null> {
    const product = await this.prisma.product.findFirst({
      where: { slug },
      include: {
        category: true,
        variants: {
          include: {
            category: true,
            media: {
              include: {
                media: true,
              },
            },
          },
        },
      },
    });
    if (!product) {
      return null;
    }

    const productVariantsPrepared = changeMediaInProductVariant(
      product.variants,
    );

    return {
      ...product,
      variants: productVariantsPrepared,
    };
  }

  async findProductsInCategory(categoryId: string): Promise<Product[] | null> {
    const products = await this.prisma.product.findMany({
      where: { categoryId },
      include: {
        category: true,
        variants: {
          include: {
            category: true,
            media: {
              include: {
                media: true,
              },
            },
          },
        },
      },
    });
    if (!products) {
      return null;
    }

    const productsPrepared: Product[] = [];

    for (const product of products) {
      const productVariantsPrepared = changeMediaInProductVariant(
        product.variants,
      );

      productsPrepared.push({
        ...product,
        variants: productVariantsPrepared,
      });
    }

    return productsPrepared;
  }
}
