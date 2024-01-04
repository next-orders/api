import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { PrismaService } from '@/db/prisma.service';
import { Employee, EmployeeContactType } from '@api-sdk';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

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
