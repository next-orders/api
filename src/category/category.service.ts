import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Category } from '@api-sdk';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async listCategories(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }
}
