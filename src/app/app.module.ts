import { ConfigModule } from '@core/configs/config.module';
import { validate } from '@core/configs/envs/validation';
import { LoggerProcessMiddleware } from '@core/middleware';
import { ApplyCurrentUserMiddleware } from '@core/middleware';
import { InfraModule } from '@infra/infra.module';
import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: false,
    }),
    ConfigModule,
    InfraModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerProcessMiddleware).forRoutes('*');
    consumer
      .apply(ApplyCurrentUserMiddleware)
      .exclude(
      { path: 'user', method: RequestMethod.POST},
      { path: 'session', method: RequestMethod.POST},
      )
      .forRoutes('*');
  }
}