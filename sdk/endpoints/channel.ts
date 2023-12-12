import { z } from 'zod';
import type { Channel, CurrencyCode, LanguageCode } from '../types/objects';

const currencyCodes: CurrencyCode[] = ['USD', 'RUB'];
const languageCodes: LanguageCode[] = ['EN', 'RU'];

export const ChannelCreateRequestSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
  currencyCode: z.enum(currencyCodes as [string, ...string[]]),
  languageCode: z.enum(languageCodes as [string, ...string[]]),
});

export type ChannelCreateRequest = z.infer<typeof ChannelCreateRequestSchema>;
export type ChannelCreateResponse = {
  ok: boolean;
  result: Channel;
};
