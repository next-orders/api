import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from '@/core/employee/employee.service';
import { Public } from '@/core/auth/auth.decorator';
import {
  EmployeeContactCreateResponse,
  EmployeeCreateResponse,
  EmployeePasswordCreateResponse,
} from '../../../sdk/endpoints';
import {
  CreateEmployeeContactDto,
  CreateEmployeeDto,
  CreateEmployeePasswordDto,
} from '@/core/employee/dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @Public()
  @Post()
  async create(
    @Body() dto: CreateEmployeeDto,
  ): Promise<EmployeeCreateResponse> {
    const created = await this.service.create(dto);
    if (!created) {
      throw new BadRequestException();
    }

    return created;
  }

  @Public()
  @Post('contact')
  async createContact(
    @Body() dto: CreateEmployeeContactDto,
  ): Promise<EmployeeContactCreateResponse> {
    const created = await this.service.createContact(dto);
    if (!created) {
      throw new BadRequestException();
    }

    return created;
  }

  @Public()
  @Post('password')
  async createPassword(
    @Body() dto: CreateEmployeePasswordDto,
  ): Promise<EmployeePasswordCreateResponse> {
    const created = await this.service.createPassword(dto);
    if (!created) {
      throw new BadRequestException();
    }

    return created;
  }
}
