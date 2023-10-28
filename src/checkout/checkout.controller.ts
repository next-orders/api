import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { AddProductDto } from '@/checkout/dto/add-product.dto';
import { Public } from '@/auth/auth.decorator';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly service: CheckoutService) {}

  @Public()
  @Post(':id/add')
  async addProductToCheckout(
    @Param('id') id: string,
    @Body() dto: AddProductDto,
  ) {
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
