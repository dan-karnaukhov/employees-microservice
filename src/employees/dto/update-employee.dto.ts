import { Length, IsString, IsEmail, IsDateString, IsOptional } from 'class-validator'

export class UpdateEmployeeDto {
  @IsString()
  @Length(1, 40)
  @IsOptional()
  firstName?: string

  @IsString()
  @Length(1, 40)
  @IsOptional()
  lastName?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @Length(1, 40)
  @IsOptional()
  position?: string

  @IsDateString({ strict: true })
  @IsOptional()
  hiringDate?: string

  @IsDateString({ strict: true })
  @IsOptional()
  birthdate?: string
}
