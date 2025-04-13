import { Length, IsString, IsEmail, IsDateString } from 'class-validator'

export class CreateEmployeeDto {
  @IsString()
  @Length(1, 40)
  firstName: string

  @IsString()
  @Length(1, 40)
  lastName: string

  @IsEmail()
  @Length(1, 40)
  email: string

  @IsString()
  @Length(1, 40)
  position: string

  @IsDateString({ strict: true })
  hiringDate: string

  @IsDateString({ strict: true })
  birthdate: string
}
