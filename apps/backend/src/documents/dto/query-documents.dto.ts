import {
  IsEnum,
  IsOptional,
  IsUUID,
  IsString,
  IsInt,
  Min,
} from "class-validator";
import { Transform } from "class-transformer";
import { DocumentType } from "./upload-document.dto";
import { DocumentStatus } from "./update-document.dto";

export class QueryDocumentsDto {
  @IsOptional()
  @IsUUID()
  companyId?: string;

  @IsOptional()
  @IsEnum(DocumentType)
  type?: DocumentType;

  @IsOptional()
  @IsEnum(DocumentStatus)
  status?: DocumentStatus;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}
