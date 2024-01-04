import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { MenuService } from '@/core/menu/menu.service';
import { Public } from '@/core/auth/auth.decorator';

@Controller('menu')
export class MenuController {
  constructor(private readonly service: MenuService) {}

  @Public()
  @Get('list/:channelId')
  async findAllMenusInChannel(@Param('channelId') channelId: string) {
    const menus = await this.service.findAllMenusInChannel(channelId);
    if (!menus) {
      throw new NotFoundException();
    }

    return menus;
  }

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
