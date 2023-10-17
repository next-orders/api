import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Channel } from '@api-sdk';

@Injectable()
export class ChannelService {
  constructor(private readonly prisma: PrismaService) {}

  async findChannelById(id: string): Promise<Channel | null> {
    const channel = await this.prisma.channel.findUnique({
      where: { id },
    });
    if (!channel) {
      return null;
    }

    return channel;
  }
}
