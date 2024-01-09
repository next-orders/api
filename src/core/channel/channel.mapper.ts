import { Injectable } from '@nestjs/common';
import { ChannelEntity } from '@/core/channel/channel.entity';
import { CountryCode, CurrencyCode, LanguageCode } from '@api-sdk';
import { Channel } from '@prisma/client';

export interface ModelChannel extends Channel {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  currencyCode: string;
  languageCode: string;
  countryCode: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  accentTextColor: string;
  accentButtonColor: string;
  accentGradientFrom: string | null;
  accentGradientTo: string | null;
  domainId: string | null;
}

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
