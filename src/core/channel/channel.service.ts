import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { Channel } from '@api-sdk';
import { CreateChannelDto } from '@/core/channel/dto/create-channel.dto';
import { ChannelRepository } from '@/core/channel/channel.repository';

@Injectable()
export class ChannelService {
  constructor(private readonly repository: ChannelRepository) {}

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
}
