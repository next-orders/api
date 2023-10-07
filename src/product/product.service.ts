import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { Product } from '../types';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findProductById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
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
}
