import { EnvsService } from '@core/configs/envs/service';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'node:path';
import { entitiesPersistenceProvider } from '@infra/database/entity/entities';
import { startPostgresContainer } from '@test/e2e/config/setup';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly envsService: EnvsService) {}
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const host = this.envsService.getEnv('DATABASE_HOST');
    const port = this.envsService.getEnv('DATABASE_PORT');
    const username = this.envsService.getEnv('DATABASE_USER');
    const password = this.envsService.getEnv('DATABASE_PASSWORD');
    const database = this.envsService.getEnv('DATABASE_NAME');

    if(this.envsService.getEnv('NODE_ENV') === 'test') {
      const { database, host, password, port, stop, username } = await startPostgresContainer();

      global['stopPostgresContainer'] = stop;
      return {
        type: 'postgres',
        host,
        port,
        username,
        password,
        database,
        entities: entitiesPersistenceProvider,
        migrations: [
          path?.resolve(
            __dirname,
            '..',
            'migrations',
            '*{.ts,.js}',
          ),
        ],
        migrationsRun: true,
        autoLoadEntities: true,
        connectTimeoutMS: 3000,
        retryDelay: 700,
        retryAttempts: 2,
      }
    }

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: entitiesPersistenceProvider,
      migrations: [
        path?.resolve(
          __dirname,
          '..',
          'migrations',
          '*{.ts,.js}',
        ),
      ],
      migrationsRun: true,
      autoLoadEntities: true,
      connectTimeoutMS: 3000,
      retryDelay: 700,
      retryAttempts: 2,
    };
  }
}
