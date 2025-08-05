import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { DATABASE_CONNECTION } from "../database/database-connection";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../database/schemas/user.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>
  ) {}

  async getUsers() {
    return this.database.query.users.findMany();
  }

  async createUser(user: typeof schema.users.$inferInsert) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 12);

      await this.database.insert(schema.users).values({
        ...user,
        password: hashedPassword,
      });
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
}
