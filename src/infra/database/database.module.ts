import { Module } from "@nestjs/common";
import { ConfigModule } from "@core/configs/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "@infra/database/config/database.connection";
import { entitiesPersistenceProvider } from "@infra/database/entity/entities";
import { ProvidersRepository, RepositoriesInterface } from "@infra/database/repositories/providers";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfig,
    }),
    TypeOrmModule.forFeature(entitiesPersistenceProvider),
  ],
  providers: ProvidersRepository,
  exports: [...RepositoriesInterface, ConfigModule],
})
export class DataBaseModule {}