import { z } from 'zod';
import { Checkout, Product } from '../types/objects';

export const ProductCreateRequestSchema = z.object({
  type: z.enum(['PRODUCTION', 'READY', 'INGREDIENT']),
  name: z.string(),
  description: z.string().optional(),
});

export type ProductCreateRequest = z.infer<typeof ProductCreateRequestSchema>;
export type ProductCreateResponse = {
  ok: boolean;
  result: Product;
};

export const ProductVariantAddToCheckoutSchema = z.object({
  productVariantId: z.string(),
});

export type ProductVariantAddToCheckoutRequest = z.infer<
  typeof ProductVariantAddToCheckoutSchema
>;
export type ProductVariantAddToCheckoutResponse = {
  ok: boolean;
  result: Checkout;
};
