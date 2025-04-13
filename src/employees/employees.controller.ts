import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

import { EmployeesService } from './employees.service'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public getEmployees() {
    return this.employeesService.getEmployees()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  public updateEmployee(@Body() dto: CreateEmployeeDto) {
    return this.employeesService.createEmployee(dto)
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  public logout(@Param('id') idString: string, @Body() dto: UpdateEmployeeDto) {
    const id = Number(idString)

    if (Number.isNaN(id)) {
      throw new BadRequestException('The id must be a number')
    }

    return this.employeesService.updateEmployee(Number(id), dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public refreshTokens(@Param('id') idString: string) {
    const id = Number(idString)

    if (Number.isNaN(id)) {
      throw new BadRequestException('The id must be a number')
    }

    return this.employeesService.deleteEmployee(id)
  }
}
