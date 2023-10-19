import { Controller, Get, NotFoundException } from '@nestjs/common';
import { MediaService } from '@/media/media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly service: MediaService) {}

  @Get('list')
  async findAllMedia() {
    const media = await this.service.findAllMedia();
    if (!media) {
      throw new NotFoundException();
    }

    return media;
  }
}
