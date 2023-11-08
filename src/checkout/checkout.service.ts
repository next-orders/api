import { Injectable, Logger } from '@nestjs/common';
import { Checkout, CheckoutLine, ProductVariant } from '@api-sdk';
import { AddProductDto, ChangeDeliveryMethodDto } from '@/checkout/dto';
import { PrismaService } from '@/db/prisma.service';
import { ProductVariantService } from '@/product-variant/product-variant.service';
import { createId } from '@paralleldrive/cuid2';

let tempCheckout: Checkout = {
  id: '123',
  deliveryMethod: 'DELIVERY',
  shippingPrice: 5,
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

    tempCheckout = this.recountTotal(tempCheckout);

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

    const isAlreadyInCart = this.checkIfAlreadyInCheckout(
      tempCheckout,
      variant.id,
    );

    tempCheckout = isAlreadyInCart
      ? this.addOneToCheckoutLine(tempCheckout, variant.id)
      : this.addNewLineToCheckout(tempCheckout, variant);

    tempCheckout = this.recountTotal(tempCheckout);

    return { ok: true, result: tempCheckout };
  }

  async findCheckoutById(id: string) {
    return tempCheckout;
  }

  recountTotal(checkout: Checkout): Checkout {
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
        updatedTotal = Number((updatedTotal + 5).toFixed(2));
      }
    }

    return {
      ...checkout,
      shippingPrice: updatedShippingPrice,
      totalPrice: updatedTotal,
    };
  }

  checkIfAlreadyInCheckout(checkout: Checkout, variantId: string): boolean {
    return !!checkout.lines.find((line) => line.variant.id === variantId);
  }

  addOneToCheckoutLine(checkout: Checkout, variantId: string): Checkout {
    const updatedLines = checkout.lines.map((line) => {
      if (line.variant.id === variantId) {
        line.quantity++;
      }
      return line;
    });

    return {
      ...checkout,
      lines: updatedLines,
    };
  }

  addNewLineToCheckout(checkout: Checkout, variant: ProductVariant): Checkout {
    const newLine: CheckoutLine = {
      id: createId(),
      quantity: 1,
      variant,
    };

    const updatedLines = [...checkout.lines, newLine];

    return {
      ...checkout,
      lines: updatedLines,
    };
  }
}
