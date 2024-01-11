import { Injectable } from '@nestjs/common';
import { EmployeePermissionType } from '@api-sdk';
import { PrismaModels } from '@/db/prisma.service';
import { EmployeePermissionEntity } from '@/core/employee/entities';

export type ModelEmployeePermission = PrismaModels['EmployeePermission'];

@Injectable()
export class EmployeePermissionMapper {
  toEntity(
    employeePermission: ModelEmployeePermission,
  ): EmployeePermissionEntity {
    return {
      ...employeePermission,
      type: employeePermission.type as EmployeePermissionType,
    };
  }
}
