import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { MenuService } from '@/menu/menu.service';
import { Public } from '@/auth/auth.decorator';

@Controller('menu')
export class MenuController {
  constructor(private readonly service: MenuService) {}

  @Public()
  @Get(':id')
  async findMenuById(@Param('id') id: string) {
    const menu = await this.service.findMenuById(id);
    if (!menu) {
      throw new NotFoundException();
    }

    return menu;
  }
}
