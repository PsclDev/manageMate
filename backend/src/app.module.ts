import { Module, type NestModule, type MiddlewareConsumer } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "./config";
import { ContractModule } from "./contract/contract.module";
import { ScheduleModule } from "@nestjs/schedule";
import { HeaderMiddleware } from "./middleware/header.middleware";

@Module({
	imports: [
		ConfigModule,
		ContractModule,
		ScheduleModule.forRoot(),
		TypeOrmModule.forRootAsync({
			useFactory: (config: ConfigService) => ({
				type: "postgres",
				host: config.database.host,
				port: config.database.port,
				username: config.database.user,
				password: config.database.password,
				database: config.database.database,
				entities: ["dist/src/**/*.entity.js"],
				migrations: ["dist/src/migrations/*.js"],
				migrationsRun: true,
				cli: {
					migrationsDir: "src/migrations",
				},
			}),
			inject: [ConfigService],
		}),
	],
})
export class AppModule implements NestModule {
	constructor(private readonly configService: ConfigService) {}

	configure(consumer: MiddlewareConsumer) {
		consumer.apply(HeaderMiddleware).forRoutes("*");
	}
}
