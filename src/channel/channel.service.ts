import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { PrismaService } from '@/db/prisma.service';
import { Channel } from '@api-sdk';
import { CreateChannelDto } from '@/channel/dto/create-channel.dto';

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

  async createChannel(dto: CreateChannelDto): Promise<Channel> {
    return this.prisma.channel.create({
      data: {
        id: createId(),
        slug: dto.slug,
        name: dto.name,
        description: dto.description,
        currencyCode: dto.currencyCode,
        languageCode: dto.languageCode,
      },
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
