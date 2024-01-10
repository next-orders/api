import { createZodDto } from 'nestjs-zod';
import { SignInByEmailRequestSchema } from '../../../../sdk/endpoints';

export class SignInByEmailDto extends createZodDto(
  SignInByEmailRequestSchema,
) {}
