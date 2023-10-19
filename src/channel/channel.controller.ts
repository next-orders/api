import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ChannelService } from '@/channel/channel.service';

@Controller('channel')
export class ChannelController {
  constructor(private readonly service: ChannelService) {}

  @Get('list')
  async findAllChannels() {
    const channels = await this.service.findAllChannels();
    if (!channels) {
      throw new NotFoundException();
    }

    return channels;
  }

  @Get(':id')
  async findChannelById(@Param('id') id: string) {
    const channel = await this.service.findChannelById(id);
    if (!channel) {
      throw new NotFoundException();
    }

    return channel;
  }
}
