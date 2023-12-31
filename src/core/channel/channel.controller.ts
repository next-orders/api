import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Permissions, Public } from '@/core/auth/auth.decorator';
import { ChannelService } from '@/core/channel/channel.service';
import { CreateChannelDto } from '@/core/channel/dto/create-channel.dto';

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
