import { createZodDto } from 'nestjs-zod';
import { EmployeePermissionCreateRequestSchema } from '../../../../sdk/endpoints';

export class CreateEmployeePermissionDto extends createZodDto(
  EmployeePermissionCreateRequestSchema,
) {}
