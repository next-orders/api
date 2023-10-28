import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '@/auth/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('health')
  health() {
    return {
      ok: true,
    };
  }

  @Public()
  @Get('version')
  apiVersion() {
    return {
      ok: true,
      version: '0.1.0',
    };
  }
}
