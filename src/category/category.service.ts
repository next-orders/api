import { Injectable } from '@nestjs/common';
import { Category } from '../types';
import { FindCategoryDto } from './dto';
import { PrismaService } from '../db/prisma.service';

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

  /** Look up a category by ID or slug */
  async findCategory(dto: FindCategoryDto): Promise<Category | null> {
    return {
      id: '1',
      name: 'Пицца',
      slug: 'pizza',
      level: 1,
    };
  }
}
