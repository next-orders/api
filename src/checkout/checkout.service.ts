import { Injectable, Logger } from '@nestjs/common';
import { Checkout, CheckoutLine } from '@api-sdk';
import { AddProductDto, ChangeDeliveryMethodDto } from '@/checkout/dto';
import { PrismaService } from '@/db/prisma.service';
import { ProductVariantService } from '@/product-variant/product-variant.service';
import { createId } from '@paralleldrive/cuid2';

let tempCheckout: Checkout = {
  id: '123',
  deliveryMethod: 'DELIVERY',
  shippingPrice: 0,
  totalPrice: 0,
  lines: [],
};

@Injectable()
export class CheckoutService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productVariant: ProductVariantService,
  ) {}

  async changeCheckoutDeliveryMethod(id: string, dto: ChangeDeliveryMethodDto) {
    Logger.log(
      `Checkout ${id}: delivery method changing to ${dto.method}`,
      'changeCheckoutDeliveryMethod',
    );

    tempCheckout.deliveryMethod = dto.method;

    this.recountTotal(tempCheckout);

    return { ok: true, result: tempCheckout };
  }

  async addProductToCheckout(id: string, dto: AddProductDto) {
    Logger.log(
      `Checkout ${id}: adding product Id ${dto.productVariantId}`,
      'addProductToCheckout',
    );

    // Find ProductVariant
    const variant = await this.productVariant.findProductVariantById(
      dto.productVariantId,
    );
    if (!variant) {
      return null;
    }

    // Max lines = 20
    if (tempCheckout.lines.length >= 20) {
      return null;
    }

    // Check, if already in Cart
    const findLine = tempCheckout.lines.find(
      (line) => line.variant.id === variant.id,
    );
    const isAlreadyInCart = !!findLine;
    if (isAlreadyInCart) {
      // +1
      const updatedLines = tempCheckout.lines.map((line) => {
        if (line.variant.id === variant.id) {
          line.quantity++;
        }
        return line;
      });

      tempCheckout = {
        ...tempCheckout,
        lines: updatedLines,
      };
    } else {
      // Add new to Cart
      const newLine: CheckoutLine = {
        id: createId(),
        quantity: 1,
        variant,
      };

      const updatedLines = [...tempCheckout.lines, newLine];

      tempCheckout = {
        ...tempCheckout,
        lines: updatedLines,
      };
    }

    // Recount
    this.recountTotal(tempCheckout);

    return { ok: true, result: tempCheckout };
  }

  async findCheckoutById(id: string) {
    return tempCheckout;
  }

  recountTotal(checkout: Checkout) {
    let updatedShippingPrice = 0;
    let updatedTotal = checkout.lines.reduce(
      (accumulator, line) =>
        accumulator + line.quantity * (line.variant.gross || 1),
      0,
    );

    // Custom: recount cart with 10% discount
    if (checkout.deliveryMethod === 'WAREHOUSE') {
      updatedTotal = Number((updatedTotal * 0.9).toFixed(2));
    }

    // Custom: recount cart with +5$ for courier
    if (checkout.deliveryMethod === 'DELIVERY') {
      // Total less than 25$
      if (updatedTotal < 25) {
        updatedShippingPrice = 5;
        updatedTotal = updatedTotal + 5;
      }
    }

    tempCheckout = {
      ...tempCheckout,
      shippingPrice: updatedShippingPrice,
      totalPrice: updatedTotal,
    };
  }
}
