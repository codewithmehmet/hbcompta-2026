import { users } from "../database/schemas/user.schema";

// Types inférés depuis le schéma Drizzle
export type User = typeof users.$inferSelect;
export type CreateUser = typeof users.$inferInsert;

// Types utilitaires pour l'authentification
export type UserWithoutPassword = Omit<User, "password">;
export type LoginUser = Pick<User, "email" | "password">;

// Enum pour les rôles (synchronisé avec le schéma)
export enum UserRole {
  ADMIN = "admin",
  ACCOUNTANT = "accountant",
  CLIENT = "client",
}
