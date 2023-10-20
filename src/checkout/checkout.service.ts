import { Injectable, Logger } from '@nestjs/common';
import { Checkout, CheckoutLine } from '@api-sdk';
import { AddProductDto } from '@/checkout/dto/add-product.dto';
import { PrismaService } from '@/db/prisma.service';
import { ProductVariantService } from '@/product-variant/product-variant.service';
import { createId } from '@paralleldrive/cuid2';

let tempCheckout: Checkout = {
  id: '123',
  lines: [],
};

@Injectable()
export class CheckoutService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productVariant: ProductVariantService,
  ) {}

  async addProductToCheckout(id: string, dto: AddProductDto) {
    Logger.log(`Checkout ${id}: adding product Id ${dto.productVariantId}`);

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
      findLine.quantity = findLine.quantity + 1;
    } else {
      // Add new to Cart
      const newLine: CheckoutLine = {
        id: createId(),
        quantity: 1,
        variant,
      };

      tempCheckout = {
        ...tempCheckout,
        lines: [...tempCheckout.lines, newLine],
      };
    }

    return { ok: true, result: tempCheckout };
  }

  async findCheckoutById(id: string) {
    return tempCheckout;
  }
}
