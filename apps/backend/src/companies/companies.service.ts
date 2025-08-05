import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DATABASE_CONNECTION } from "../database/database-connection";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../database/schemas/company.schema";
import { eq } from "drizzle-orm";

@Injectable()
export class CompaniesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>
  ) {}

  async create(company: typeof schema.companies.$inferInsert) {
    const [created] = await this.database
      .insert(schema.companies)
      .values(company)
      .returning();

    return created;
  }

  async findAll() {
    return this.database.query.companies.findMany();
  }
  async findOne(id: string) {
    const company = await this.database.query.companies.findFirst({
      where: eq(schema.companies.id, id),
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  async update(
    id: string,
    company: Partial<typeof schema.companies.$inferInsert>
  ) {
    const [updated] = await this.database
      .update(schema.companies)
      .set(company)
      .where(eq(schema.companies.id, id))
      .returning();

    if (!updated) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return updated;
  }

  async delete(id: string) {
    const [company] = await this.database
      .delete(schema.companies)
      .where(eq(schema.companies.id, id))
      .returning();

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }
}
