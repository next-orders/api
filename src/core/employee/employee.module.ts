import { Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { EmployeeController } from '@/core/employee/employee.controller';
import { EmployeeService } from '@/core/employee/employee.service';
import { AuthService } from '@/core/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService, AuthService, JwtService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
