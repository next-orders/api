import { Controller, Get, NotFoundException } from '@nestjs/common';
import { MediaService } from '@/media/media.service';
import { Public } from '@/auth/auth.decorator';

@Controller('media')
export class MediaController {
  constructor(private readonly service: MediaService) {}

  @Public()
  @Get('list')
  async findAllMedia() {
    const media = await this.service.findAllMedia();
    if (!media) {
      throw new NotFoundException();
    }

    return media;
  }
}
