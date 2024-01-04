import { Controller } from '@nestjs/common';
import { EmployeeService } from '@/core/employee/employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}
}
