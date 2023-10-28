import { z } from 'zod';

export const SignInByEmailRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInByEmailRequest = z.infer<typeof SignInByEmailRequestSchema>;
export type SignInByEmailResponse = {
  ok: boolean;
  result: {
    access_token: string;
  };
};
