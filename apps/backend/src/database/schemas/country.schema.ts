import { relations } from "drizzle-orm";
import { pgTable, timestamp, varchar, boolean } from "drizzle-orm/pg-core";
import { companies } from "./company.schema";

export const countries = pgTable("countries", {
  code: varchar("code", { length: 2 }).primaryKey(), // ISO 3166-1 alpha-2 (LU, BE, FR, etc.)
  nameFr: varchar("name_fr", { length: 100 }).notNull(), // Nom en français
  nameEn: varchar("name_en", { length: 100 }).notNull(), // Nom en anglais
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const countryRelations = relations(countries, ({ many }) => ({
  companies: many(companies),
}));
