import { Injectable, BadRequestException } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'

import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  public async getEmployees() {
    return await this.prisma.employee.findMany()
  }

  public async createEmployee(dto: CreateEmployeeDto) {
    const existingEmployee = await this.prisma.employee.findUnique({
      where: { email: dto.email },
    })

    if (existingEmployee) {
      throw new BadRequestException('An employee with such an email already exists')
    }

    return await this.prisma.employee.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        position: dto.position,
        hiringDate: dto.hiringDate,
        birthdate: dto.birthdate,
      },
    })
  }

  public async updateEmployee(id: number, dto: UpdateEmployeeDto) {
    const existingEmployee = await this.prisma.employee.findUnique({
      where: { id },
    })

    if (!existingEmployee) {
      throw new BadRequestException('There is no employee with such an id')
    }

    if (dto.email) {
      const existingEmployee = await this.prisma.employee.findUnique({
        where: { email: dto.email },
      })

      if (existingEmployee) {
        throw new BadRequestException('An employee with such an email already exists')
      }
    }

    await this.prisma.employee.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        position: dto.position,
        hiringDate: dto.hiringDate,
        birthdate: dto.birthdate,
      },
    })
  }

  public async deleteEmployee(id: number) {
    const existingEmployee = await this.prisma.employee.findUnique({
      where: { id },
    })

    if (!existingEmployee) {
      throw new BadRequestException('There is no employee with such an id')
    }

    await this.prisma.employee.delete({
      where: { id },
    })
  }
}
