import { Channel, CountryCode, CurrencyCode, LanguageCode } from '@api-sdk';
import { createId } from '@paralleldrive/cuid2';

export class ChannelEntity implements Channel {
  id!: string;
  slug!: string;
  name!: string;
  description!: string | null;
  currencyCode!: CurrencyCode;
  languageCode!: LanguageCode;
  countryCode!: CountryCode;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  accentTextColor!: string;
  accentButtonColor!: string;
  accentGradientFrom!: string | null;
  accentGradientTo!: string | null;

  constructor(data: Partial<ChannelEntity>) {
    Object.assign(this, data);

    if (!data.id) {
      this.id = createId();
    }
  }
}
