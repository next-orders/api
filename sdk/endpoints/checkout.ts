import { z } from 'zod';
import { Checkout } from '../types/objects';

export const CheckoutCreateRequestSchema = z.object({
  channelId: z.string(),
  deliveryMethod: z.enum(['DELIVERY', 'WAREHOUSE']),
});

export type CheckoutCreateRequest = z.infer<typeof CheckoutCreateRequestSchema>;
export type CheckoutCreateResponse = {
  ok: boolean;
  result: Checkout;
};

export const CheckoutChangeDeliveryMethodRequestSchema = z.object({
  method: z.enum(['DELIVERY', 'WAREHOUSE']),
});

export type CheckoutChangeDeliveryMethodRequest = z.infer<
  typeof CheckoutChangeDeliveryMethodRequestSchema
>;
export type CheckoutChangeDeliveryMethodResponse = {
  ok: boolean;
  result: Checkout;
};

export type CheckoutAddOneToLineResponse = {
  ok: boolean;
  result: Checkout;
};

export type CheckoutRemoveOneFromLineResponse = {
  ok: boolean;
  result: Checkout;
};
