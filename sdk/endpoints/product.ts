import { z } from 'zod';

export const ProductCreateRequestSchema = z.object({
  name: z.string(),
});

export type ProductCreateRequest = z.infer<typeof ProductCreateRequestSchema>;
