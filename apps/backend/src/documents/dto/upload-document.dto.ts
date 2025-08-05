import { IsEnum, IsUUID, IsOptional, IsString } from "class-validator";

export enum DocumentType {
  IDENTITY = "identity",
  FINANCIAL = "financial",
  TAX = "tax",
  LEGAL = "legal",
  ADMINISTRATIVE = "administrative",
  OTHER = "other",
}

export class UploadDocumentDto {
  @IsUUID()
  companyId: string;

  @IsEnum(DocumentType)
  type: DocumentType;

  @IsOptional()
  @IsString()
  description?: string;
}
