import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { DocumentsController } from "./documents.controller";
import { DocumentsService } from "./documents.service";
import { DatabaseModule } from "../database/database.module";
import { memoryStorage } from "multer";

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({
      storage: memoryStorage(), // ✅ Stockage en mémoire pour avoir access à file.buffer
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
