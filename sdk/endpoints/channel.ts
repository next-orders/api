import { z } from 'zod';
import { Channel } from '../types/objects';

export const ChannelCreateRequestSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
  currencyCode: z.enum(['USD', 'RUB']),
  languageCode: z.enum(['EN', 'RU']),
});

export type ChannelCreateRequest = z.infer<typeof ChannelCreateRequestSchema>;
export type ChannelCreateResponse = {
  ok: boolean;
  result: Channel;
};
