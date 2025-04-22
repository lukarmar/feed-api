import { Module } from "@nestjs/common";
import { DataBaseModule } from "@infra/database/database.module";
import { HttpModule } from "@infra/http/http.module";
import { HelpersModule } from "@core/helpers/helpers.module";

@Module({
  imports: [DataBaseModule, HttpModule, HelpersModule],
  controllers: [],
  providers: [],
  exports: [DataBaseModule, HttpModule, HelpersModule],
})
export class InfraModule {}