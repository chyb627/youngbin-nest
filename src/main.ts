import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';
// import * as basicAuth from 'express-basic-auth';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { SentryInterceptor } from './common/interceptor/sentry.interceptor';

async function bootstrap() {
  const port = 8000;
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.STAGE === 'prod' ? 'info' : 'debug',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('Youngbin-Nest', { prettyPrint: true }),
          ),
        }),
      ],
    }),
  });

  const configService = app.get(ConfigService);
  const stage = configService.get('STAGE');

  // Swagger
  const SWAGGER_ENVS = ['local', 'dev']; // swagger 노출 위치 지정
  if (SWAGGER_ENVS.includes(stage)) {
    // app.use(
    //   ['/api', '/api-json'],
    //   basicAuth({
    //     challenge: true,
    //     users: {
    //       [configService.get('swagger.user')]: configService.get('swagger.password'),
    //     },
    //   }),
    // );

    const config = new DocumentBuilder()
      .setTitle('Youngbin Nest')
      .setDescription('NestJS project API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
    };
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, customOptions);
  }

  // ValidationPipe 전역 적용
  app.useGlobalPipes(
    new ValidationPipe({
      // class-transformer 적용
      transform: true,
    }),
  );

  Sentry.init({ dsn: configService.get('sentry.dsn') });
  app.useGlobalInterceptors(new SentryInterceptor(), new TransformInterceptor());

  await app.listen(port);
  Logger.log(`STAGE: ${process.env.STAGE}`);
  Logger.log(`listening on port ${port}`);
}
bootstrap();
