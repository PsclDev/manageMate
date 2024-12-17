import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config';
import { HeaderMiddleware } from './middleware/header.middleware';

async function bootstrap() {
  const logger = new Logger('App');
  const app = await NestFactory.create(AppModule);
  
  const config = app.get(ConfigService);
  app.use(HeaderMiddleware);
  app.enableCors({
    origin: config.cors.allowedOrigins,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  if (config.printAppConfig) {
    config.printAppConfig();
  }

  await app.listen(config.app.port);
  logger.log(`App listening on port: ${config.app.port}`);
}

bootstrap();
