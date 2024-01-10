import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '@/db/prisma.service';
import {
  Employee,
  EmployeeContact,
  EmployeeContactType,
  EmployeePermission,
} from '@api-sdk';
import { createId } from '@paralleldrive/cuid2';
import {
  CreateEmployeeContactDto,
  CreateEmployeeDto,
  CreateEmployeePasswordDto,
  CreateEmployeePermissionDto,
} from '@/core/employee/dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeDto) {
    const created = await this.prisma.employee.create({
      data: {
        id: createId(),
        firstName: dto.firstName,
      },
      include: {
        permissions: true,
      },
    });
    if (!created) {
      return null;
    }

    return {
      ok: true,
      result: created as Employee,
    };
  }

  async createContact(dto: CreateEmployeeContactDto) {
    const created = await this.prisma.employeeContact.create({
      data: {
        id: createId(),
        employeeId: dto.employeeId,
        value: dto.value,
        type: dto.type,
        isUsedForAuthentication: dto.isUsedForAuthentication,
      },
    });
    if (!created) {
      return null;
    }

    return {
      ok: true,
      result: created as EmployeeContact,
    };
  }

  async createPassword(dto: CreateEmployeePasswordDto) {
    const hashedPassword = await hash(dto.password, 10);

    const created = await this.prisma.employeePassword.create({
      data: {
        id: createId(),
        hash: hashedPassword,
        employeeId: dto.employeeId,
      },
    });
    if (!created) {
      return null;
    }

    return {
      ok: true,
    };
  }

  async createPermission(dto: CreateEmployeePermissionDto) {
    const created = await this.prisma.employeePermission.create({
      data: {
        id: createId(),
        employeeId: dto.employeeId,
        type: dto.type,
      },
    });
    if (!created) {
      return null;
    }

    return {
      ok: true,
      result: created as EmployeePermission,
    };
  }

  async findEmployeeByContact(
    contactValue: string,
    type: EmployeeContactType,
  ): Promise<Employee | null> {
    const employeeContact = await this.prisma.employeeContact.findFirst({
      where: { value: contactValue, type },
    });
    if (!employeeContact) {
      return null;
    }

    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeContact.employeeId },
      include: {
        permissions: true,
      },
    });
    if (!employee) {
      return null;
    }

    return employee as Employee;
  }

  async checkPassword(employeeId: string, password: string) {
    const passwords = await this.prisma.employeePassword.findMany({
      where: { employeeId },
    });
    if (!passwords) {
      return null;
    }

    for (const p of passwords) {
      // Check Hash
      const match = await compare(password, p.hash);
      if (match) {
        // This Password is valid!
        return true;
      }
    }

    // No similar Passwords
    return false;
  }
}
