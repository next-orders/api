import { Module } from '@nestjs/common';
import { AvatarController } from '@/avatar/avatar.controller';

@Module({
  controllers: [AvatarController],
})
export class AvatarModule {}
