import { createZodDto } from 'nestjs-zod';
import { ProductVariantAddToCheckoutSchema } from '@/../sdk/endpoints';

export class AddProductDto extends createZodDto(
  ProductVariantAddToCheckoutSchema,
) {}
