import { Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { EmployeeController } from '@/core/employee/employee.controller';
import { EmployeeService } from '@/core/employee/employee.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
