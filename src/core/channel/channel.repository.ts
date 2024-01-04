import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';

@Injectable()
export class ChannelRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.channel.findMany({
      include: {
        menus: {
          include: {
            categories: true,
          },
        },
      },
    });
  }

  findById(id: string) {
    return this.prisma.channel.findUnique({
      where: { id },
      include: {
        menus: {
          include: {
            categories: true,
          },
        },
      },
    });
  }

  create(data: any) {
    return this.prisma.channel.create({
      data,
      include: {
        menus: {
          include: {
            categories: true,
          },
        },
      },
    });
  }
}
