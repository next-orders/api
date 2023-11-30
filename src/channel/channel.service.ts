import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { PrismaService } from '@/db/prisma.service';
import { Channel, MenuCategory } from '@api-sdk';
import { CreateChannelDto } from '@/channel/dto/create-channel.dto';
import { ProductVariantService } from '@/product-variant/product-variant.service';

@Injectable()
export class ChannelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productVariant: ProductVariantService,
  ) {}

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

  async searchInChannel(channelId: string, query: string) {
    if (query.length < 2) {
      return null;
    }

    const [channel, foundProducts] = await Promise.all([
      this.findChannelById(channelId),
      this.productVariant.findProductVariantByName(query),
    ]);

    if (!foundProducts) {
      return null;
    }

    const menus = channel?.menus;
    if (!menus) {
      return null;
    }

    // Get all possible categories for this channel
    const categories: MenuCategory[] = [];
    for (const menu of menus) {
      for (const category of menu.categories) {
        categories.push(category);
      }
    }

    // Filter only in this categories
    foundProducts.filter((product) =>
      categories.some((value) => value.id === product.category.id),
    );

    return foundProducts;
  }
}
