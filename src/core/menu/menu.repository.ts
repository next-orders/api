import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { MenuEntity } from '@/core/menu/entities';

@Injectable()
export class MenuRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: MenuEntity): Promise<MenuEntity> {
    return this.prisma.menu.create({ data });
  }

  findAllByChannelId(channelId: string): Promise<MenuEntity[]> {
    return this.prisma.menu.findMany({
      where: { channelId },
      include: {
        categories: true,
      },
    });
  }

  findById(id: string): Promise<MenuEntity | null> {
    return this.prisma.menu.findUnique({
      where: { id },
    });
  }
}
