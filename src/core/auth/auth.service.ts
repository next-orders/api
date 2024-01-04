import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createId } from '@paralleldrive/cuid2';
import type {
  EmployeePermissionType,
  JWTEmployeeAccessTokenPayload,
  JWTEmployeeData,
} from '@api-sdk';
import { PrismaService } from '@/db/prisma.service';
import { EmployeeService } from '@/core/employee/employee.service';
import { SignInByEmailDto } from '@/core/auth/dto/signin-by-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly employee: EmployeeService,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async verifyToken(token: string) {
    try {
      const payload = await this.jwt.verifyAsync<JWTEmployeeAccessTokenPayload>(
        token,
        {
          secret: this.config.getOrThrow('JWT_SECRET'),
        },
      );
      if (!payload.user) {
        return null;
      }

      return payload;
    } catch (err) {
      return null;
    }
  }

  async signInByEmail(dto: SignInByEmailDto) {
    const employee = await this.employee.findEmployeeByContact(
      dto.email,
      'EMAIL',
    );
    if (!employee) {
      return null;
    }

    const isPasswordValid = await this.employee.checkPassword(
      employee.id,
      dto.password,
    );
    if (!isPasswordValid) {
      return null;
    }

    // Get all Permissions
    const permissions = employee.permissions.map(
      (p: { type: EmployeePermissionType }) => p.type,
    );

    // Generate a JWT
    const sub = createId();
    const user: JWTEmployeeData = {
      id: employee.id,
      permissions,
    };

    const payload: Omit<JWTEmployeeAccessTokenPayload, 'iat' | 'exp'> = {
      sub,
      user,
    };

    const access_token = await this.jwt.signAsync(payload, {
      secret: this.config.getOrThrow('JWT_SECRET'),
    });

    return {
      ok: true,
      result: {
        access_token,
      },
    };
  }
}
