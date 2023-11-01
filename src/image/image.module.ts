import { Module } from '@nestjs/common';
import { ImageController } from '@/image/image.controller';
import { S3Service } from '@/s3/s3.service';

@Module({
  controllers: [ImageController],
  providers: [S3Service],
})
export class ImageModule {}
