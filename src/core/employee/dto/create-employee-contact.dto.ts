import { createZodDto } from 'nestjs-zod';
import { EmployeeContactCreateRequestSchema } from '../../../../sdk/endpoints';

export class CreateEmployeeContactDto extends createZodDto(
  EmployeeContactCreateRequestSchema,
) {}
