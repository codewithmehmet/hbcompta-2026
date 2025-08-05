// Export all schemas
export * from "./user.schema";
export * from "./company.schema";
export * from "./country.schema";

// Combined schema type for Drizzle
import * as userSchema from "./user.schema";
import * as companySchema from "./company.schema";
import * as countrySchema from "./country.schema";

export const combinedSchema = {
  ...userSchema,
  ...companySchema,
  ...countrySchema,
};

export type CombinedSchema = typeof combinedSchema;
