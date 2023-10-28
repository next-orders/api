import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { EmployeeService } from '@/employee/employee.service';
import { SignInByEmailDto } from '@/auth/dto/signin-by-email.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTEmployeeAccessTokenPayload, JWTEmployeeData } from '@api-sdk';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class AuthService {
  constructor(
    private readonly employee: EmployeeService,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

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
    const permissions = permissionsFull.map((p) => p.type);

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

    const access_token = await this.jwt.signAsync(payload);

    // TODO: Add new token to DB

    return {
      ok: true,
      result: {
        access_token,
      },
    };
  }
}
