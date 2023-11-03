import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  CheckoutChangeDeliveryMethodResponse,
  ProductVariantAddToCheckoutResponse,
} from '@api-sdk';
import { CheckoutService } from './checkout.service';
import { Public } from '@/auth/auth.decorator';
import { AddProductDto, ChangeDeliveryMethodDto } from '@/checkout/dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly service: CheckoutService) {}

  @Public()
  @Post(':id/method')
  async changeCheckoutDeliveryMethod(
    @Param('id') id: string,
    @Body() dto: ChangeDeliveryMethodDto,
  ): Promise<CheckoutChangeDeliveryMethodResponse> {
    const changed = await this.service.changeCheckoutDeliveryMethod(id, dto);
    if (!changed) {
      throw new BadRequestException();
    }

    return changed;
  }

  @Public()
  @Post(':id/add')
  async addProductToCheckout(
    @Param('id') id: string,
    @Body() dto: AddProductDto,
  ): Promise<ProductVariantAddToCheckoutResponse> {
    const added = await this.service.addProductToCheckout(id, dto);
    if (!added) {
      throw new BadRequestException();
    }

    return added;
  }

  @Public()
  @Get(':id')
  findCheckoutById(@Param('id') id: string) {
    return this.service.findCheckoutById(id);
  }
}
