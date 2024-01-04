import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { Channel, MenuCategory } from '@api-sdk';
import { CreateChannelDto } from '@/core/channel/dto/create-channel.dto';
import { ProductVariantService } from '@/core/product-variant/product-variant.service';
import { ChannelRepository } from '@/core/channel/channel.repository';

@Injectable()
export class ChannelService {
  constructor(
    private readonly repository: ChannelRepository,
    private readonly productVariant: ProductVariantService,
  ) {}

  async findAllChannels(): Promise<Channel[]> {
    return (await this.repository.findAll()) as Channel[];
  }

  async findChannelById(id: string): Promise<Channel | null> {
    const channel = await this.repository.findById(id);
    if (!channel) {
      return null;
    }

    return channel as Channel;
  }

  async createChannel(dto: CreateChannelDto): Promise<Channel> {
    const newChannel = {
      id: createId(),
      slug: dto.slug,
      name: dto.name,
      description: dto.description,
      currencyCode: dto.currencyCode,
      languageCode: dto.languageCode,
      countryCode: dto.countryCode,
    };

    const created = await this.repository.create(newChannel);

    return created as Channel;
  }

  async getTopSearchInChannel(channelId: string) {
    const [channel, foundProducts] = await Promise.all([
      this.findChannelById(channelId),
      this.productVariant.findPopularProductVariants(),
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
    return foundProducts.filter((product) =>
      categories.some((value) => value.id === product.category.id),
    );
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
    return foundProducts.filter((product) =>
      categories.some((value) => value.id === product.category.id),
    );
  }
}
