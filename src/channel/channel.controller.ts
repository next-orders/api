import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ChannelService } from '@/channel/channel.service';
import { Public } from '@/auth/auth.decorator';

@Controller('channel')
export class ChannelController {
  constructor(private readonly service: ChannelService) {}

  @Public()
  @Get('list')
  async findAllChannels() {
    const channels = await this.service.findAllChannels();
    if (!channels) {
      throw new NotFoundException();
    }

    return channels;
  }

  @Public()
  @Get(':id')
  async findChannelById(@Param('id') id: string) {
    const channel = await this.service.findChannelById(id);
    if (!channel) {
      throw new NotFoundException();
    }

    return channel;
  }
}
