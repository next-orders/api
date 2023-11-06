import { z } from 'zod';
import { Checkout } from '../types/objects';

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