import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API de Negociações')
    .setDescription('Documentação da API de Negociações e Funis')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  app.use('/api-json', (req, res) => res.json(document));

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
