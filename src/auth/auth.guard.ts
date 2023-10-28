import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { EmployeePermission, JWTEmployeeAccessTokenPayload } from '@api-sdk';
import { IS_PUBLIC_KEY, REQUIRED_PERMISSIONS } from '@/auth/auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // If endpoint have Public decorator
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // If endpoint have Permissions decorator
    const requiredPermissions = this.reflector.getAllAndOverride<
      EmployeePermission['type'][]
    >(REQUIRED_PERMISSIONS, [context.getHandler(), context.getClass()]);

    if (requiredPermissions.length) {
      // Have required
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }

      try {
        const payload =
          await this.jwt.verifyAsync<JWTEmployeeAccessTokenPayload>(token, {
            secret: process.env.JWT_SECRET ?? 'no-secret',
          });

        // User have this
        const permissions = payload.user.permissions;

        for (const p of requiredPermissions) {
          if (!permissions.includes(p)) {
            // This permission not found on User: 403
            return false;
          }
        }
      } catch {
        throw new UnauthorizedException();
      }

      return true;
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
