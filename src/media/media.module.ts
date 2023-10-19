import { Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { MediaController } from '@/media/media.controller';
import { MediaService } from '@/media/media.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService, PrismaService],
})
export class MediaModule {}
