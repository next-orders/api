import { createZodDto } from 'nestjs-zod';
import { MenuCategoryCreateRequestSchema } from '../../../../sdk/endpoints';

export class CreateMenuCategoryDto extends createZodDto(
  MenuCategoryCreateRequestSchema,
) {}
