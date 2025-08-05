import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { DATABASE_CONNECTION } from "../database/database-connection";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../database/schemas/user.schema";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>
  ) {}

  async getUsers() {
    return this.database.query.users.findMany();
  }

  async createUser(data: typeof schema.users.$inferInsert) {
    try {
      const [user] = await this.database
        .insert(schema.users)
        .values({
          ...data,
          password: await bcrypt.hash(data.password, 10),
        })
        .returning({
          email: schema.users.email,
          id: schema.users.id,
        });

      return user;
    } catch (error: any) {
      const pgError = error.cause;
      if (pgError && pgError.code === "23505") {
        throw new UnprocessableEntityException(
          "User with this email already exists."
        );
      }
      throw error;
    }
  }

  async getUser(filter: { email?: string; id?: string }) {
    let user: typeof schema.users.$inferSelect | undefined;

    if (filter.email) {
      user = await this.database.query.users.findFirst({
        where: eq(schema.users.email, filter.email),
      });
    } else if (filter.id) {
      user = await this.database.query.users.findFirst({
        where: eq(schema.users.id, filter.id),
      });
    }

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }
}
