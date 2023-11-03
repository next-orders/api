import { createZodDto } from 'nestjs-zod';
import { CheckoutChangeDeliveryMethodRequestSchema } from '@api-sdk';

export class ChangeDeliveryMethodDto extends createZodDto(
  CheckoutChangeDeliveryMethodRequestSchema,
) {}
