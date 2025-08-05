import { IsEnum, IsOptional, IsString } from "class-validator";

export enum DocumentStatus {
  PENDING = "pending",
  PROCESSED = "processed",
  ARCHIVED = "archived",
  REJECTED = "rejected",
}

export class UpdateDocumentDto {
  @IsOptional()
  @IsEnum(DocumentStatus)
  status?: DocumentStatus;

  @IsOptional()
  @IsString()
  description?: string;
}
