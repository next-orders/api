import { createZodDto } from 'nestjs-zod';
import { ProductVariantAddToCheckoutSchema } from '@api-sdk';

export class AddProductDto extends createZodDto(
  ProductVariantAddToCheckoutSchema,
) {}
