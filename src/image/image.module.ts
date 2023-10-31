import { Module } from '@nestjs/common';
import { ImageController } from '@/image/image.controller';

@Module({
  controllers: [ImageController],
  providers: [],
})
export class ImageModule {}
