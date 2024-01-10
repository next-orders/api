import { z } from 'zod';
import { Employee, EmployeeContact } from '../types/objects';

export const EmployeeCreateRequestSchema = z.object({
  firstName: z.string(),
});

export type EmployeeCreateRequest = z.infer<typeof EmployeeCreateRequestSchema>;
export type EmployeeCreateResponse = {
  ok: boolean;
  result: Employee;
};

export const EmployeeContactCreateRequestSchema = z.object({
  employeeId: z.string(),
  type: z.string(),
  value: z.string(),
  isUsedForAuthentication: z.boolean(),
});

export type EmployeeContactCreateRequest = z.infer<
  typeof EmployeeContactCreateRequestSchema
>;
export type EmployeeContactCreateResponse = {
  ok: boolean;
  result: EmployeeContact;
};
