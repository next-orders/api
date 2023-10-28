import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { SignInByEmailDto } from '@/auth/dto/signin-by-email.dto';
import { SignInByEmailResponse } from '@api-sdk';
import { Public } from '@/auth/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

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
}
