import { createZodDto } from 'nestjs-zod';
import { CheckoutCreateRequestSchema } from '@api-sdk';

export class CreateCheckoutDto extends createZodDto(
  CheckoutCreateRequestSchema,
) {}
