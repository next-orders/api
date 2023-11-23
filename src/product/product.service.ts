import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { PrismaService } from '@/db/prisma.service';
import { Product } from '@api-sdk';
import { changeMediaInProductVariant } from '@/lib/helpers';
import { CreateProductDto } from '@/product/dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findProductById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
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

  async findProducts(): Promise<Product[] | null> {
    const products = await this.prisma.product.findMany({
      include: {
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

  async createProduct(dto: CreateProductDto): Promise<Product | null> {
    const product = await this.prisma.product.create({
      data: {
        id: createId(),
        type: dto.type,
        name: dto.name,
        description: dto.description,
      },
      include: {
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
}
