import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { countries } from "./country.schema";

export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  notes: text("notes"),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  postalCode: varchar("postal_code", { length: 10 }),
  countryId: varchar("country_id", { length: 2 }).references(
    () => countries.code
  ),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const companyRelations = relations(companies, ({ many, one }) => ({
  documents: many(documents),
  country: one(countries, {
    fields: [companies.countryId],
    references: [countries.code],
  }),
}));

// Enum pour le type de document
export const documentTypeEnum = pgEnum("document_type", [
  "identity", // Pièces d'identité, statuts
  "financial", // Bilans, comptes de résultat
  "tax", // Déclarations fiscales, TVA
  "legal", // Contrats, actes juridiques
  "administrative", // Correspondances, attestations
  "other", // Autres documents
]);

// Enum pour le statut du document
export const documentStatusEnum = pgEnum("document_status", [
  "pending", // En attente de traitement
  "processed", // Traité
  "archived", // Archivé
  "rejected", // Rejeté
]);

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  type: documentTypeEnum("type").notNull(),
  status: documentStatusEnum("status").default("pending"),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  originalFileName: varchar("original_file_name", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  fileSize: integer("file_size").notNull(), // En octets
  filePath: varchar("file_path", { length: 500 }).notNull(), // Chemin de stockage
  uploadedBy: uuid("uploaded_by"), // ID de l'utilisateur qui a uploadé (à connecter plus tard)
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const documentRelations = relations(documents, ({ one }) => ({
  company: one(companies, {
    fields: [documents.companyId],
    references: [companies.id],
  }),
}));
