import { createZodDto } from 'nestjs-zod';
import { ChannelCreateRequestSchema } from '@/../sdk/endpoints';

export class CreateChannelDto extends createZodDto(
  ChannelCreateRequestSchema,
) {}
