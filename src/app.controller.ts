import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  health() {
    return {
      ok: true,
    };
  }

  @Get('version')
  apiVersion() {
    return {
      ok: true,
      version: '0.1.0',
    };
  }
}
