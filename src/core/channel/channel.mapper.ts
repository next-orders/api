import { Injectable } from '@nestjs/common';
import { ChannelEntity } from '@/core/channel/channel.entity';
import { CountryCode, CurrencyCode, LanguageCode } from '@api-sdk';
import { PrismaModels } from '@/db/prisma.service';

type ModelChannel = PrismaModels['Channel'];

@Injectable()
export class ChannelMapper {
  toEntity(channel: ModelChannel): ChannelEntity {
    return {
      ...channel,
      currencyCode: channel.currencyCode as CurrencyCode,
      languageCode: channel.languageCode as LanguageCode,
      countryCode: channel.countryCode as CountryCode,
    };
  }
}