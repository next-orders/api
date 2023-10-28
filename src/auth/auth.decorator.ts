import { SetMetadata } from '@nestjs/common';
import { EmployeePermission } from '@api-sdk';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const REQUIRED_PERMISSIONS = 'requiredPermissions';
export const Permissions = (permissions: EmployeePermission['type'][]) =>
  SetMetadata(REQUIRED_PERMISSIONS, permissions);
