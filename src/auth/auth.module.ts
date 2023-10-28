import { Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { EmployeeService } from '@/employee/employee.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, EmployeeService, PrismaService],
})
export class AuthModule {}
