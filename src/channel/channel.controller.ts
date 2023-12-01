import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Permissions, Public } from '@/auth/auth.decorator';
import { ChannelService } from '@/channel/channel.service';
import { CreateChannelDto } from '@/channel/dto/create-channel.dto';

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
  @Get(':id/search')
  async getTopSearchInChannel(@Param('id') id: string) {
    const top = await this.service.getTopSearchInChannel(id);
    if (!top) {
      throw new NotFoundException();
    }

    return top;
  }

  @Public()
  @Get(':id/search/:query')
  async searchInChannel(
    @Param('id') id: string,
    @Param('query') query: string,
  ) {
    const found = await this.service.searchInChannel(id, query);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
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

  @Permissions(['EDIT_CHANNELS'])
  @Post()
  async createChannel(@Body() dto: CreateChannelDto) {
    const created = await this.service.createChannel(dto);
    if (!created) {
      throw new BadRequestException();
    }

    return created;
  }
}
