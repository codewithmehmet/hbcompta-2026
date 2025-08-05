import { Module } from "@nestjs/common";
import { ProductModule } from "./product/product.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { DatabaseModule } from "./database/database.module";
import { CompaniesModule } from "./companies/companies.module";

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get("NODE_ENV") === "production";

        return {
          pinoHttp: {
            transport: isProduction
              ? undefined
              : {
                  target: "pino-pretty",
                  options: {
                    singleLine: false,
                    translateTime: "yyyy-mm-dd HH:MM:ss",
                    colorize: true,
                    ignore: "pid,hostname",
                    messageFormat: "{msg}",
                  },
                },
            level: isProduction ? "info" : "debug",
            autoLogging: true,
            redact: ["req.headers.authorization", "req.body.password"],
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ProductModule,
    UsersModule,
    CompaniesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
