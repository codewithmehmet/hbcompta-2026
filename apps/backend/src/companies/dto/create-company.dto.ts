import { IsString, IsEmail, IsOptional, Length } from "class-validator";

export class CreateCompanyDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 255)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  phone?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  city?: string;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  postalCode?: string;

  @IsOptional()
  @IsString()
  @Length(2, 2)
  countryId?: string;
}
