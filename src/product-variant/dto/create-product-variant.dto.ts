import { createZodDto } from 'nestjs-zod';
import { ProductVariantCreateRequestSchema } from '@api-sdk';

export class CreateProductVariantDto extends createZodDto(
  ProductVariantCreateRequestSchema,
) {}
