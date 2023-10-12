import { createZodDto } from 'nestjs-zod';
import { ProductCreateRequestSchema } from '@api-sdk';

export class CreateProductDto extends createZodDto(
  ProductCreateRequestSchema,
) {}
