import { Controller, Get, Param } from '@nestjs/common';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly service: CheckoutService) {}

  @Get(':id')
  findCheckoutById(@Param() id: string) {
    return this.service.findCheckoutById(id);
  }
}
