import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { Public } from '@/auth/auth.decorator';
import { S3Service } from '@/s3/s3.service';

@Controller('image')
export class ImageController {
  constructor(private readonly s3: S3Service) {}

  @Public()
  @Get('static/:imageName')
  async getLocalImage(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ) {
    const filePath = join(process.cwd(), `/public/static/${imageName}`);

    // Check
    if (!existsSync(filePath)) {
      throw new NotFoundException();
    }

    const file = createReadStream(filePath);

    res.set({ 'Content-Type': 'image/png' });

    return file.pipe(res);
  }
}
