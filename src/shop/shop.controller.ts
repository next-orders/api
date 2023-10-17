import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ShopService } from '@/shop/shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly service: ShopService) {}

  @Get(':id')
  async findShopById(@Param('id') id: string) {
    const shop = await this.service.findShopById(id);
    if (!shop) {
      throw new NotFoundException();
    }

    return shop;
  }
}
