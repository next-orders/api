import { Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { ChannelController } from '@/channel/channel.controller';
import { ChannelService } from '@/channel/channel.service';
import { ProductVariantService } from '@/product-variant/product-variant.service';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService, ProductVariantService, PrismaService],
})
export class ChannelModule {}
