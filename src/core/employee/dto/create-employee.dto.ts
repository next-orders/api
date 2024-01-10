import { createZodDto } from 'nestjs-zod';
import { EmployeeCreateRequestSchema } from '../../../../sdk/endpoints';

export class CreateEmployeeDto extends createZodDto(
  EmployeeCreateRequestSchema,
) {}
