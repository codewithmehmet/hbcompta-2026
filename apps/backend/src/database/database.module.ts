import { Module } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "./database-connection";
import { ConfigService } from "@nestjs/config";
import { Pool } from "pg";
import * as userSchema from "./schemas/user.schema";
import * as companySchema from "./schemas/company.schema";
import * as countrySchema from "./schemas/country.schema";

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow("DATABASE_URL"),
        });
        return drizzle(pool, {
          schema: { ...userSchema, ...companySchema, ...countrySchema },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
