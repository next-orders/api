import { z } from 'zod';
import { Checkout } from '../types/objects';

export const ProductCreateRequestSchema = z.object({
  name: z.string(),
});

export const ProductVariantAddToCheckoutSchema = z.object({
  productVariantId: z.string(),
});

export type ProductCreateRequest = z.infer<typeof ProductCreateRequestSchema>;
export type ProductVariantAddToCheckoutRequest = z.infer<
  typeof ProductVariantAddToCheckoutSchema
>;
export type ProductVariantAddToCheckoutResponse = {
  ok: boolean;
  result: Checkout;
};
