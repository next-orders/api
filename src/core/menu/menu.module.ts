import { Module } from '@nestjs/common';
import { MenuController } from '@/core/menu/menu.controller';
import { MenuService } from '@/core/menu/menu.service';
import { PrismaService } from '@/db/prisma.service';
import { ProductVariantService } from '@/core/product-variant/product-variant.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, PrismaService, ProductVariantService],
})
export class MenuModule {}
