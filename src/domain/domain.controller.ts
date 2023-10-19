import { Controller, Get, NotFoundException } from '@nestjs/common';
import { DomainService } from '@/domain/domain.service';

@Controller('domain')
export class DomainController {
  constructor(private readonly service: DomainService) {}

  @Get('list')
  async findAllDomains() {
    const domains = await this.service.findAllDomains();
    if (!domains) {
      throw new NotFoundException();
    }

    return domains;
  }
}
