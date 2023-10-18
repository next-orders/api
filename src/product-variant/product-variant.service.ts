import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { ProductMedia, ProductVariant } from '@api-sdk';

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

    const productsPrepared: ProductVariant[] = [];

    // Move Media to root
    for (const product of products) {
      const media: ProductMedia[] = product.media.map((media) => ({
        id: media.media.id,
        alt: media.media.alt,
        url: media.media.url,
      }));

      productsPrepared.push({
        ...product,
        media: media,
      });
    }

    return productsPrepared;
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

    // Move Media to root
    const media: ProductMedia[] = product.media.map((media) => ({
      id: media.media.id,
      alt: media.media.alt,
      url: media.media.url,
    }));

    return {
      ...product,
      media,
    };
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

    // Move Media to root
    const media: ProductMedia[] = product.media.map((media) => ({
      id: media.media.id,
      alt: media.media.alt,
      url: media.media.url,
    }));

    return {
      ...product,
      media,
    };
  }
}
