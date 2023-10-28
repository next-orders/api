import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ShopService } from '@/shop/shop.service';
import { Public } from '@/auth/auth.decorator';

@Controller('shop')
export class ShopController {
  constructor(private readonly service: ShopService) {}

  @Public()
  @Get(':id')
  async findShopById(@Param('id') id: string) {
    const shop = await this.service.findShopById(id);
    if (!shop) {
      throw new NotFoundException();
    }

    return shop;
  }
}
