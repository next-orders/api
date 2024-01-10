import { createZodDto } from 'nestjs-zod';
import { EmployeePasswordCreateRequestSchema } from '../../../../sdk/endpoints';

export class CreateEmployeePasswordDto extends createZodDto(
  EmployeePasswordCreateRequestSchema,
) {}
