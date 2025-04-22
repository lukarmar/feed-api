import { Module } from "@nestjs/common";
import { UserCaseProvider } from "@infra/http/use-cases/providers";
import { DataBaseModule } from "@infra/database/database.module";
import { UserController, SessionController, PostController } from '@infra/http/controllers'
import { HelpersModule } from "@core/helpers/helpers.module";

@Module({
  imports: [DataBaseModule, HelpersModule],
  controllers: [UserController, SessionController, PostController],
  providers: UserCaseProvider,
})
export class HttpModule{}