import { Module } from '@nestjs/common';
import { MenuController } from '@/menu/menu.controller';
import { MenuService } from '@/menu/menu.service';
import { PrismaService } from '@/db/prisma.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, PrismaService],
})
export class MenuModule {}
