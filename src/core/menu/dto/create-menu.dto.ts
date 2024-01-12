import { createZodDto } from 'nestjs-zod';
import { MenuCreateRequestSchema } from '../../../../sdk/endpoints';

export class CreateMenuDto extends createZodDto(MenuCreateRequestSchema) {}
