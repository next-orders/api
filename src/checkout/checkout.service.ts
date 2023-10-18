import { Injectable } from '@nestjs/common';
import { Checkout } from '@api-sdk';

@Injectable()
export class CheckoutService {
  /** Look up a checkout by id */
  async findCheckoutById(id: string) {
    return {
      id,
      lines: [
        {
          id: '123',
          quantity: 2,
          variant: {
            id: 'phiny2u518hnjvxbuwe79tk0',
            name: 'Four seasons',
            description: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            sku: '11',
            weightUnit: 'g',
            weightValue: 545,
            onSale: false,
            currency: 'USD',
            gross: 7.89,
            net: 7.89,
            tax: 0,
            media: [
              {
                id: 'f9jibjq7nqm5e3uwd343rer7',
                alt: 'Four Seasons',
                url: 'https://v1.next-orders.org/static/products/pizza/1.png',
              },
            ],
          },
        },
      ],
    } as Checkout;
  }
}
