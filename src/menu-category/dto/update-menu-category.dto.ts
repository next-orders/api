import { createZodDto } from 'nestjs-zod';
import { MenuCategoryUpdateRequestSchema } from '@api-sdk';

export class UpdateMenuCategoryDto extends createZodDto(
  MenuCategoryUpdateRequestSchema,
) {}
