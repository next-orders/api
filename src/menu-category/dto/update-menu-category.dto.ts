import { createZodDto } from 'nestjs-zod';
import { MenuCategoryUpdateRequestSchema } from '@/../sdk/endpoints';

export class UpdateMenuCategoryDto extends createZodDto(
  MenuCategoryUpdateRequestSchema,
) {}
