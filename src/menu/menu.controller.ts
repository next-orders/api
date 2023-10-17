import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { MenuService } from '@/menu/menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly service: MenuService) {}

  @Get(':id')
  async findMenuById(@Param('id') id: string) {
    const menu = await this.service.findMenuById(id);
    if (!menu) {
      throw new NotFoundException();
    }

    return menu;
  }
}
