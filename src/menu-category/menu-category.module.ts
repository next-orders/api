import { Module } from '@nestjs/common';
import { MenuCategoryController } from '@/menu-category/menu-category.controller';
import { MenuCategoryService } from '@/menu-category/menu-category.service';
import { PrismaService } from '@/db/prisma.service';

@Module({
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService, PrismaService],
})
export class MenuCategoryModule {}
