import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Category } from '@api-sdk';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  /** List of the shop's categories */
  async listCategories(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();

    return [
      ...categories,
      {
        id: '7',
        name: 'Еще категория',
        slug: '#',
        level: 1,
      },
      {
        id: '8',
        name: 'Еще категория',
        slug: '#',
        level: 1,
      },
      {
        id: '9',
        name: 'Еще категория',
        slug: '#',
        level: 1,
      },
      {
        id: '10',
        name: 'Еще категория',
        slug: '#',
        level: 1,
      },
      {
        id: '11',
        name: 'Еще категория',
        slug: '#',
        level: 1,
      },
      {
        id: '12',
        name: 'Еще категория',
        slug: '#',
        level: 1,
      },
      {
        id: '13',
        name: 'Еще категория',
        slug: '#',
        level: 1,
      },
      {
        id: '14',
        name: 'Еще категория',
        slug: '#',
        level: 1,
      },
      {
        id: '15',
        name: 'Еще категория',
        slug: '#',
        level: 1,
      },
      {
        id: '16',
        name: 'Еще категория',
        slug: '#',
        level: 1,
      },
    ];
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: { slug },
    });
  }
}
