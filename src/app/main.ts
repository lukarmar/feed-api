import { NestFactory } from '@nestjs/core';
import { Logger, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvsService } from '@core/configs/envs/service';
import { AppModule } from './app.module';
import { CustomExceptionFilterMiddleware } from '@core/middleware';
import { writeFileSync } from 'fs';

async function bootstrap() {
  console.log('Starting application...');
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    bufferLogs: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const swaggerOptions = new DocumentBuilder()
      .setTitle('Feed API')
      .setDescription('The API description')
      .setVersion('1.0')
      .addBearerAuth(
        {
          description: 'Default JWT Authorization',
          type: 'http',
          in: 'header',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token'
      )
      .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api/v1', app, swaggerDocument);
  const envService = app.get(EnvsService);

  if(envService.getEnv('NODE_ENV') === 'development') {
    const docsPath = './docs/swagger';
    writeFileSync(`${docsPath}/swagger.json`, JSON.stringify(swaggerDocument));
  }
  


  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,  
    exceptionFactory(errors): Error {
      return new UnprocessableEntityException({
        message: 'Validation failed',
        detail: errors.map((error) => 
          error?.constraints ? Object.values(error.constraints) : [],
        ),
      });     
    },
  }));

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
  });

  app.useGlobalFilters(new CustomExceptionFilterMiddleware());
  
  const server = await app.listen(envService.getEnv('API_PORT') ?? 4568);
  Logger.log(`Application running on: ${server.address().address}:${server.address().port}`);
}
bootstrap();
