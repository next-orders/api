import {
  Body,
  Controller,
  Get,
  NotFoundException,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from '@/media/media.service';
import { Permissions } from '@/auth/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadMediaDto } from '@/media/dto/upload-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly service: MediaService) {}

  @Permissions(['READ_MEDIA'])
  @Get('list')
  async findAllMedia() {
    const media = await this.service.findAllMedia();
    if (!media) {
      throw new NotFoundException();
    }

    return media;
  }

  @Permissions(['EDIT_MEDIA'])
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(new ParseFilePipe({ validators: [] }))
    file: Express.Multer.File,
    @Body()
    dto: UploadMediaDto,
  ) {
    return this.service.uploadMedia(file, dto);
  }
}
