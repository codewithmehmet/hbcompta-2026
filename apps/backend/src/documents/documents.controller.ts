import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  Res,
  HttpStatus,
  ParseFilePipe,
  MaxFileSizeValidator,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Response } from "express";
import { DocumentsService } from "./documents.service";
import { UploadDocumentDto } from "./dto/upload-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { QueryDocumentsDto } from "./dto/query-documents.dto";

class CustomFileTypeValidator {
  private readonly allowedMimeTypes = [
    // Images
    "image/jpeg",
    "image/png",
    "image/gif",
    // Documents
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // Texte
    "text/plain",
  ];

  isValid(file: Express.Multer.File): boolean {
    return this.allowedMimeTypes.includes(file.mimetype);
  }

  buildErrorMessage(): string {
    return `Invalid file type. Allowed types: ${this.allowedMimeTypes.join(", ")}`;
  }
}

@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadDocument(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
        ],
      })
    )
    file: Express.Multer.File,
    @Body() uploadDto: UploadDocumentDto
  ) {
    // Validation manuelle du type de fichier
    const fileValidator = new CustomFileTypeValidator();
    if (!fileValidator.isValid(file)) {
      throw new BadRequestException(fileValidator.buildErrorMessage());
    }

    return this.documentsService.uploadDocument(file, uploadDto);
  }

  @Get()
  async findAll(@Query() query: QueryDocumentsDto) {
    return this.documentsService.findAll(query);
  }

  @Get("stats")
  async getStats(@Query("companyId") companyId?: string) {
    return this.documentsService.getDocumentStats(companyId);
  }

  @Get("company/:companyId")
  async findByCompany(@Param("companyId") companyId: string) {
    return this.documentsService.findByCompany(companyId);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.documentsService.findOne(id);
  }

  @Get(":id/download")
  async downloadDocument(@Param("id") id: string, @Res() res: Response) {
    try {
      const { buffer, filename, mimetype } =
        await this.documentsService.downloadDocument(id);

      res.set({
        "Content-Type": mimetype,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": buffer.length.toString(),
      });

      res.send(buffer);
    } catch {
      res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Document not found",
      });
    }
  }

  @Get(":id/preview")
  async previewDocument(@Param("id") id: string, @Res() res: Response) {
    try {
      const { buffer, filename, mimetype } =
        await this.documentsService.downloadDocument(id);

      // Pour l'aperçu, on utilise inline au lieu d'attachment
      res.set({
        "Content-Type": mimetype,
        "Content-Disposition": `inline; filename="${filename}"`,
        "Content-Length": buffer.length.toString(),
      });

      res.send(buffer);
    } catch {
      res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Document not found",
      });
    }
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateDto: UpdateDocumentDto) {
    return this.documentsService.update(id, updateDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.documentsService.delete(id);
  }
}
