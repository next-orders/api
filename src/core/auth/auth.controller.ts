import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '@/core/auth/auth.service';
import { SignInByEmailDto } from '@/core/auth/dto/signin-by-email.dto';
import { SignInByEmailResponse } from '../../../sdk/endpoints';
import { Public } from '@/core/auth/auth.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly config: ConfigService,
    private readonly service: AuthService,
  ) {}

  @Public()
  @Get('verify/:token')
  async verifyToken(@Param('token') token: string) {
    const payload = await this.service.verifyToken(token);
    if (!payload) {
      throw new BadRequestException();
    }

    return payload;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('employee/email')
  async signInByEmail(
    @Body() dto: SignInByEmailDto,
  ): Promise<SignInByEmailResponse> {
    const jwt = await this.service.signInByEmail(dto);
    if (!jwt) {
      throw new UnauthorizedException();
    }

    return jwt;
  }

  @Public()
  @Get('employee/demo')
  async getDemoSignIn() {
    return {
      email: this.config.get<string>('DEMO_AUTH_EMAIL'),
      password: this.config.get<string>('DEMO_AUTH_PASS'),
    };
  }
}
