import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EmployeePermissionType } from '@api-sdk';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Permissions =
  Reflector.createDecorator<EmployeePermissionType[]>();
