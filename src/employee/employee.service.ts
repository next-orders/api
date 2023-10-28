import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async findEmployeeByContact(contactValue: string, type: 'EMAIL') {
    const employeeContact = await this.prisma.employeeContact.findFirst({
      where: { value: contactValue, type },
    });
    if (!employeeContact) {
      return null;
    }

    // Return Employee
    return this.prisma.employee.findUnique({
      where: { id: employeeContact.employeeId },
      include: {
        permissions: true,
      },
    });
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
      if (p.hash === password) {
        // This Password is valid!
        return true;
      }
    }

    // No similar Passwords
    return false;
  }
}
