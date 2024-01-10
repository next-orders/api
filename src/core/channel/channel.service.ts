import { Injectable } from '@nestjs/common';
import { Channel, CountryCode, CurrencyCode, LanguageCode } from '@api-sdk';
import { CreateChannelDto } from '@/core/channel/dto/create-channel.dto';
import { ChannelRepository } from '@/core/channel/channel.repository';
import { ChannelEntity } from '@/core/channel/channel.entity';
import { ChannelCreateResponse } from '../../../sdk/endpoints';

@Injectable()
export class ChannelService {
  constructor(private readonly repository: ChannelRepository) {}

  findAllChannels(): Promise<Channel[]> {
    return this.repository.findAll();
  }

  findChannelById(id: string): Promise<Channel | null> {
    return this.repository.findById(id);
  }

  async createChannel(dto: CreateChannelDto): Promise<ChannelCreateResponse> {
    const channelEntity = new ChannelEntity({
      slug: dto.slug,
      name: dto.name,
      description: dto.description ?? null,
      currencyCode: dto.currencyCode as CurrencyCode,
      languageCode: dto.languageCode as LanguageCode,
      countryCode: dto.countryCode as CountryCode,
    });

    const created = await this.repository.create(channelEntity);

    return {
      ok: true,
      result: created,
    };
  }
}
