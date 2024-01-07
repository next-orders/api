import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Channel } from '@prisma/client';

@Injectable()
export class ChannelRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Channel[]> {
    return this.prisma.channel.findMany();
  }

  findById(id: string): Promise<Channel | null> {
    return this.prisma.channel.findUnique({ where: { id } });
  }

  create(data: any): Promise<Channel> {
    return this.prisma.channel.create({ data });
  }
}
