import { Module } from '@nestjs/common';
import { ChannelController } from '@/core/channel/channel.controller';
import { ChannelService } from '@/core/channel/channel.service';
import { ProductVariantService } from '@/core/product-variant/product-variant.service';
import { ChannelRepository } from '@/core/channel/channel.repository';
import { PrismaService } from '@/db/prisma.service';

@Module({
  controllers: [ChannelController],
  providers: [
    ChannelService,
    ChannelRepository,
    PrismaService,
    ProductVariantService,
  ],
})
export class ChannelModule {}
