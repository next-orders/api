import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Product } from '@api-sdk';

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
            category: true,
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
            category: true,
            media: true,
          },
        },
      },
    });
  }

  async findProductsInCategory(categoryId: string): Promise<Product[] | null> {
    const products = await this.prisma.product.findMany({
      where: { categoryId },
      include: {
        category: true,
        variants: {
          include: {
            category: true,
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
