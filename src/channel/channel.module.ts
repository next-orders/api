import { Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { ChannelController } from '@/channel/channel.controller';
import { ChannelService } from '@/channel/channel.service';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService, PrismaService],
})
export class ChannelModule {}
