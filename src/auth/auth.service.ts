import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { EmployeeService } from '@/employee/employee.service';
import { SignInByEmailDto } from '@/auth/dto/signin-by-email.dto';
import { JwtService } from '@nestjs/jwt';
import {
  EmployeePermission,
  JWTEmployeeAccessTokenPayload,
  JWTEmployeeData,
} from '@api-sdk';
import { createId } from '@paralleldrive/cuid2';
import { ConfigService } from '@nestjs/config';

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
      Logger.warn(err, 'verifyToken');
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
    const permissionsFull = employee.permissions;
    const permissions = permissionsFull.map(
      (p: { type: EmployeePermission['type'] }) => p.type,
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

    // TODO: Add new token to DB

    return {
      ok: true,
      result: {
        access_token,
      },
    };
  }
}
