import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EmployeePermission } from '@api-sdk';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Permissions =
  Reflector.createDecorator<EmployeePermission['type'][]>();
