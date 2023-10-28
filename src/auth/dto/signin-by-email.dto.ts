import { createZodDto } from 'nestjs-zod';
import { SignInByEmailRequestSchema } from '@api-sdk';

export class SignInByEmailDto extends createZodDto(
  SignInByEmailRequestSchema,
) {}
