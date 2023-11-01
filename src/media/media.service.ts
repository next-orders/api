import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Media, UploadMediaResponse } from '@api-sdk';
import { S3Service } from '@/s3/s3.service';
import { UploadMediaDto } from '@/media/dto/upload-media.dto';

@Injectable()
export class MediaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: S3Service,
  ) {}

  async findAllMedia(): Promise<Media[] | null> {
    return this.prisma.media.findMany();
  }

  async uploadMedia(
    file: Express.Multer.File,
    dto: UploadMediaDto,
  ): Promise<UploadMediaResponse> {
    await this.s3.upload(file.originalname, file.buffer);

    // Save to DB

    return {
      ok: true,
      result: {
        name: dto.alt,
      },
    };
  }
}
