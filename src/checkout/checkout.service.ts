import { Injectable, Logger } from '@nestjs/common';
import { Checkout, CheckoutLine } from '@api-sdk';
import { AddProductDto } from '@/checkout/dto/add-product.dto';
import { PrismaService } from '@/db/prisma.service';
import { ProductVariantService } from '@/product-variant/product-variant.service';
import { createId } from '@paralleldrive/cuid2';

let tempCheckout: Checkout = {
  id: '123',
  lines: [
    {
      id: '123',
      quantity: 2,
      variant: {
        id: 'phiny2u518hnjvxbuwe79tk0',
        name: 'Four seasons',
        slug: 'four-seasons',
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
        seoTitle: null,
        seoDescription: null,
        category: {
          id: 'hyw1yz8idynz72otujkbrnlp',
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Pizza',
          slug: 'pizza',
        },
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
};

@Injectable()
export class CheckoutService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productVariant: ProductVariantService,
  ) {}

  async addProductToCheckout(id: string, dto: AddProductDto) {
    Logger.log(`Checkout ${id}: adding product`);

    // Find ProductVariant
    const variant = await this.productVariant.findProductVariantById(
      dto.productVariantId,
    );
    if (!variant) {
      return null;
    }

    // Max lines = 25
    if (tempCheckout.lines.length >= 25) {
      return null;
    }

    // Product Found. Add one to Cart
    const line: CheckoutLine = {
      id: createId(),
      quantity: 1,
      variant,
    };

    tempCheckout = {
      ...tempCheckout,
      lines: [...tempCheckout.lines, line],
    };

    return { ok: true, result: tempCheckout };
  }

  async findCheckoutById(id: string) {
    return tempCheckout;
  }
}
