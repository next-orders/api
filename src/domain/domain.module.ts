import { Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { DomainController } from '@/domain/domain.controller';
import { DomainService } from '@/domain/domain.service';

@Module({
  controllers: [DomainController],
  providers: [DomainService, PrismaService],
})
export class DomainModule {}
