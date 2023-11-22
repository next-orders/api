import { createZodDto } from 'nestjs-zod';
import { ChannelCreateRequestSchema } from '@api-sdk';

export class CreateChannelDto extends createZodDto(
  ChannelCreateRequestSchema,
) {}
