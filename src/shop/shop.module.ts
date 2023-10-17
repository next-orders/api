import { Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { ShopController } from '@/shop/shop.controller';
import { ShopService } from '@/shop/shop.service';

@Module({
  controllers: [ShopController],
  providers: [ShopService, PrismaService],
})
export class ShopModule {}
