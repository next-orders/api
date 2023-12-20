import { createZodDto } from 'nestjs-zod';
import { ProductVariantCreateRequestSchema } from '@/../sdk/endpoints';

export class CreateProductVariantDto extends createZodDto(
  ProductVariantCreateRequestSchema,
) {}
