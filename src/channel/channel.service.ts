import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Channel } from '@api-sdk';

@Injectable()
export class ChannelService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllChannels(): Promise<Channel[] | null> {
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

  async findChannelById(id: string): Promise<Channel | null> {
    const channel = await this.prisma.channel.findUnique({
      where: { id },
      include: {
        menus: {
          include: {
            categories: true,
          },
        },
      },
    });
    if (!channel) {
      return null;
    }

    return channel;
  }
}
