import { Injectable, Logger } from '@nestjs/common';
import {
  Checkout,
  CheckoutAddOneToLineResponse,
  CheckoutLine,
  CheckoutRemoveOneFromLineResponse,
  ProductVariant,
} from '@api-sdk';
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
      ? this.addOneToCheckoutLineByVariantId(tempCheckout, variant.id)
      : this.addNewLineToCheckout(tempCheckout, variant);

    tempCheckout = this.recountTotal(tempCheckout);

    return { ok: true, result: tempCheckout };
  }

  async addOneToCheckoutLine(
    checkoutId: string,
    lineId: string,
  ): Promise<CheckoutAddOneToLineResponse> {
    Logger.log(
      `Checkout ${checkoutId}: adding one to line Id ${lineId}`,
      'addOneToCheckoutLine',
    );

    tempCheckout = this.addOneToCheckoutLineByLineId(tempCheckout, lineId);
    tempCheckout = this.recountTotal(tempCheckout);

    return { ok: true, result: tempCheckout };
  }

  async removeOneFromCheckoutLine(
    checkoutId: string,
    lineId: string,
  ): Promise<CheckoutRemoveOneFromLineResponse> {
    Logger.log(
      `Checkout ${checkoutId}: removing one from line Id ${lineId}`,
      'removeOneFromCheckoutLine',
    );

    tempCheckout = this.removeOneFromCheckoutLineByLineId(tempCheckout, lineId);
    tempCheckout = this.recountTotal(tempCheckout);

    return { ok: true, result: tempCheckout };
  }

  async findCheckoutById(id: string): Promise<Checkout | null> {
    const checkout = await this.prisma.checkout.findUnique({
      where: { id },
      include: {
        lines: {
          include: {
            productVariant: {
              include: {
                media: {
                  include: {
                    media: true,
                  },
                },
                category: true,
              },
            },
          },
        },
      },
    });
    if (!checkout) {
      return null;
    }

    return checkout;
  }

  recountTotal(checkout: Checkout): Checkout {
    let updatedShippingPrice = 0;
    let updatedTotal = Number(
      checkout.lines
        .reduce(
          (accumulator, line) =>
            accumulator + line.quantity * (line.productVariant.gross || 1),
          0,
        )
        .toFixed(2),
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
    return !!checkout.lines.find(
      (line) => line.productVariant.id === variantId,
    );
  }

  addOneToCheckoutLineByVariantId(
    checkout: Checkout,
    variantId: string,
  ): Checkout {
    const updatedLines = checkout.lines.map((line) => {
      if (line.productVariant.id === variantId) {
        line.quantity++;
      }
      return line;
    });

    return {
      ...checkout,
      lines: updatedLines,
    };
  }

  addOneToCheckoutLineByLineId(checkout: Checkout, lineId: string): Checkout {
    const updatedLines = checkout.lines.map((line) => {
      if (line.id === lineId) {
        line.quantity++;
      }
      return line;
    });

    return {
      ...checkout,
      lines: updatedLines,
    };
  }

  removeOneFromCheckoutLineByLineId(
    checkout: Checkout,
    lineId: string,
  ): Checkout {
    const updatedLines = checkout.lines
      .map((line) => {
        if (line.id === lineId) {
          line.quantity--;
        }
        return line;
      })
      .filter((line) => line.quantity > 0);

    return {
      ...checkout,
      lines: updatedLines,
    };
  }

  addNewLineToCheckout(
    checkout: Checkout,
    productVariant: ProductVariant,
  ): Checkout {
    const newLine: CheckoutLine = {
      id: createId(),
      quantity: 1,
      productVariant,
    };

    const updatedLines = [...checkout.lines, newLine];

    return {
      ...checkout,
      lines: updatedLines,
    };
  }
}
