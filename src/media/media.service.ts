import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Media } from '@api-sdk';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllMedia(): Promise<Media[] | null> {
    return this.prisma.media.findMany();
  }
}
