import { Module } from '@nestjs/common';
import { SessionDataUserHelper } from '@core/helpers/session-data-user.helper';


@Module({
  imports: [],
  exports: [SessionDataUserHelper],
  providers: [SessionDataUserHelper],
})
export class HelpersModule {}
