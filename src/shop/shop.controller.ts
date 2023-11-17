import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ShopService } from '@/shop/shop.service';
import { Public } from '@/auth/auth.decorator';

@Controller('shop')
export class ShopController {
  constructor(private readonly service: ShopService) {}

  @Public()
  @Get()
  async getShopData() {
    /** Shop can be only one in DB */
    const shop = await this.service.getShopData();
    if (!shop) {
      throw new NotFoundException();
    }

    return shop;
  }
}
