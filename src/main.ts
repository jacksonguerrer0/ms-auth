import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppExceptionsFilter } from './commons/exceptions/app-exception-filter.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      skipNullProperties: true,
    }),
  );

  // TODO: dEFINIT LOGGER
  app.useGlobalFilters(new AppExceptionsFilter());

  const swaConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('MS-AUTH')
    .setVersion('1.0')
    .build();
  const swaDocument = SwaggerModule.createDocument(app, swaConfig);
  SwaggerModule.setup('docs', app, swaDocument);

  await app.listen(3001);
}
bootstrap();
