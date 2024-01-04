import { createZodDto } from 'nestjs-zod';
import { ProductCreateRequestSchema } from '../../../../sdk/endpoints';

export class CreateProductDto extends createZodDto(
  ProductCreateRequestSchema,
) {}
