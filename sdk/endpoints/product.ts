import { z } from 'zod';
import { Checkout, Product, ProductVariant } from '../types/objects';

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

export const ProductVariantCreateRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  slug: z.string(),
  sku: z.string().optional(),
  weightUnit: z.enum(['G', 'KG', 'LB', 'OZ']),
  weightValue: z.number(),
  gross: z.number(),
  net: z.number().optional(),
  tax: z.number().optional(),
  productId: z.string(),
  categoryId: z.string(),
});

export type ProductVariantCreateRequest = z.infer<
  typeof ProductVariantCreateRequestSchema
>;
export type ProductVariantCreateResponse = {
  ok: boolean;
  result: ProductVariant;
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
