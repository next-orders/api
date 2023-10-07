import { Injectable } from '@nestjs/common';
import { Checkout } from '../types';

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
            name: 'Четыре сезона',
            createdAt: new Date(),
            updatedAt: new Date(),
            sku: '11',
            weightUnit: 'г',
            weightValue: 545,
            onSale: false,
            currency: 'RUB',
            gross: 789,
            net: 789,
            tax: 0,
            media: [
              {
                id: 'djbekzdi4srsdmwneuexn8fx',
                alt: 'Фото',
                url: '/static/products/pizza/1.png',
              },
            ],
          },
        },
      ],
    } as Checkout;
  }
}
