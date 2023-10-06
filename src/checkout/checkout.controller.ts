import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { FindCheckoutDto } from './dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly service: CheckoutService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  findCheckout(@Body() dto: FindCheckoutDto) {
    return this.service.findCheckout(dto);
  }
}
