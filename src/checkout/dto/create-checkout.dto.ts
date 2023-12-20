import { createZodDto } from 'nestjs-zod';
import { CheckoutCreateRequestSchema } from '@/../sdk/endpoints';

export class CreateCheckoutDto extends createZodDto(
  CheckoutCreateRequestSchema,
) {}
