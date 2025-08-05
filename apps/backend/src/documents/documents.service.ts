import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { DATABASE_CONNECTION } from "../database/database-connection";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import {
  type CombinedSchema,
  companies,
  documents,
} from "../database/schemas/index";
import { eq, and, desc, ilike, count, type SQL } from "drizzle-orm";
import { UploadDocumentDto } from "./dto/upload-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { QueryDocumentsDto } from "./dto/query-documents.dto";
import * as fs from "fs/promises";
import * as path from "path";
import { randomUUID } from "crypto";

@Injectable()
export class DocumentsService {
  private readonly uploadPath =
    process.env.UPLOAD_PATH || "./uploads/documents";

  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<CombinedSchema>
  ) {
    this.ensureUploadDirectoryExists();
  }

  private async ensureUploadDirectoryExists() {
    try {
      await fs.access(this.uploadPath);
    } catch {
      await fs.mkdir(this.uploadPath, { recursive: true });
    }
  }

  async uploadDocument(
    file: Express.Multer.File,
    uploadDto: UploadDocumentDto,
    uploadedBy?: string
  ) {
    if (!file) {
      throw new BadRequestException("No file provided");
    }

    try {
      // Vérifier que l'entreprise existe
      const company = await this.database.query.companies.findFirst({
        where: eq(companies.id, uploadDto.companyId),
      });
      if (!company) {
        throw new NotFoundException(
          `Company with ID ${uploadDto.companyId} not found`
        );
      }

      // Générer un nom de fichier unique
      const fileExtension = path.extname(file.originalname);
      const fileName = `${randomUUID()}${fileExtension}`;
      const filePath = path.join(this.uploadPath, fileName);

      try {
        // Sauvegarder le fichier
        await fs.writeFile(filePath, file.buffer);

        // Enregistrer en base de données
        const [document] = await this.database
          .insert(documents)
          .values({
            companyId: uploadDto.companyId,
            type: uploadDto.type,
            fileName,
            originalFileName: file.originalname,
            mimeType: file.mimetype,
            fileSize: file.size,
            filePath,
            uploadedBy,
          })
          .returning();

        return document;
      } catch (error) {
        // Nettoyer le fichier en cas d'erreur
        try {
          await fs.unlink(filePath);
          // eslint-disable-next-line no-empty
        } catch {}
        throw error;
      }
    } catch (error) {
      // Nettoyer le fichier temporaire Multer en cas d'erreur de validation
      if (file?.path) {
        try {
          await fs.unlink(file.path);
          // eslint-disable-next-line no-empty
        } catch {}
      }
      throw error;
    }
  }

  async findAll(query: QueryDocumentsDto) {
    const { page = 1, limit = 10, companyId, type, status, search } = query;
    const offset = (page - 1) * limit;

    // Construire les conditions WHERE
    const whereConditions: SQL[] = [];

    if (companyId) {
      whereConditions.push(eq(documents.companyId, companyId));
    }

    if (type) {
      whereConditions.push(eq(documents.type, type));
    }

    if (status) {
      whereConditions.push(eq(documents.status, status));
    }

    if (search) {
      whereConditions.push(ilike(documents.originalFileName, `%${search}%`));
    }

    const whereClause =
      whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // Récupérer les documents avec pagination
    const documentsData = await this.database.query.documents.findMany({
      where: whereClause,
      with: {
        company: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [desc(documents.createdAt)],
      limit,
      offset,
    });

    // Compter le total pour la pagination
    const countResult = await this.database
      .select({ totalCount: count() })
      .from(documents)
      .where(whereClause);

    const totalCount = countResult[0]?.totalCount || 0;

    return {
      data: documentsData,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    };
  }

  async findOne(id: string) {
    const document = await this.database.query.documents.findFirst({
      where: eq(documents.id, id),
      with: {
        company: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    return document;
  }

  async findByCompany(companyId: string) {
    const documentsData = await this.database.query.documents.findMany({
      where: eq(documents.companyId, companyId),
      orderBy: [desc(documents.createdAt)],
    });

    return documentsData;
  }

  async update(id: string, updateDto: UpdateDocumentDto) {
    const [document] = await this.database
      .update(documents)
      .set({
        ...updateDto,
        updatedAt: new Date(),
      })
      .where(eq(documents.id, id))
      .returning();

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    return document;
  }

  async delete(id: string) {
    const document = await this.findOne(id);

    // Supprimer le fichier physique
    try {
      await fs.unlink(document.filePath);
    } catch (error) {
      console.warn(`Could not delete file ${document.filePath}:`, error);
    }

    // Supprimer l'enregistrement de la base de données
    const [deletedDocument] = await this.database
      .delete(documents)
      .where(eq(documents.id, id))
      .returning();

    return deletedDocument;
  }

  async downloadDocument(id: string) {
    const document = await this.findOne(id);

    try {
      const fileBuffer = await fs.readFile(document.filePath);
      return {
        buffer: fileBuffer,
        filename: document.originalFileName,
        mimetype: document.mimeType,
      };
    } catch {
      throw new NotFoundException("File not found on disk");
    }
  }

  async getDocumentStats(companyId?: string) {
    const whereClause = companyId
      ? eq(documents.companyId, companyId)
      : undefined;

    const stats = await this.database
      .select({
        status: documents.status,
        type: documents.type,
        count: count(),
      })
      .from(documents)
      .where(whereClause)
      .groupBy(documents.status, documents.type);

    return stats;
  }
}
