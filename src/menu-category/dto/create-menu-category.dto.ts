import { createZodDto } from 'nestjs-zod';
import { MenuCategoryCreateRequestSchema } from '@api-sdk';

export class CreateMenuCategoryDto extends createZodDto(
  MenuCategoryCreateRequestSchema,
) {}
