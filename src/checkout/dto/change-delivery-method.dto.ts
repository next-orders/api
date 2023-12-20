import { createZodDto } from 'nestjs-zod';
import { CheckoutChangeDeliveryMethodRequestSchema } from '@/../sdk/endpoints';

export class ChangeDeliveryMethodDto extends createZodDto(
  CheckoutChangeDeliveryMethodRequestSchema,
) {}
