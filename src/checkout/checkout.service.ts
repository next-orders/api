import { Injectable, Logger } from '@nestjs/common';
import { Checkout, CheckoutLine } from '@api-sdk';
import { AddProductDto, ChangeDeliveryMethodDto } from '@/checkout/dto';
import { PrismaService } from '@/db/prisma.service';
import { ProductVariantService } from '@/product-variant/product-variant.service';
import { createId } from '@paralleldrive/cuid2';

let tempCheckout: Checkout = {
  id: '123',
  deliveryMethod: 'DELIVERY',
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

      // Recount
      const updatedTotal = updatedLines.reduce(
        (accumulator, line) =>
          accumulator + line.quantity * (line.variant.gross || 1),
        0,
      );

      tempCheckout = {
        ...tempCheckout,
        lines: updatedLines,
        totalPrice: updatedTotal,
      };
    } else {
      // Add new to Cart
      const newLine: CheckoutLine = {
        id: createId(),
        quantity: 1,
        variant,
      };

      const updatedLines = [...tempCheckout.lines, newLine];

      // Recount
      const updatedTotal = updatedLines.reduce(
        (accumulator, line) =>
          accumulator + line.quantity * (line.variant.gross || 1),
        0,
      );

      tempCheckout = {
        ...tempCheckout,
        lines: updatedLines,
        totalPrice: updatedTotal,
      };
    }

    return { ok: true, result: tempCheckout };
  }

  async findCheckoutById(id: string) {
    return tempCheckout;
  }
}
