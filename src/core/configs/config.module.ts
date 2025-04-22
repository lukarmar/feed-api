import { Global, Module } from '@nestjs/common';
import { EnvsService } from '@core/configs/envs/service';
import { AuthModule } from '@core/configs/auth/auth.module';
import { CryptographyModule } from './cryptography';

@Global()
@Module({
  imports: [CryptographyModule, AuthModule],
  providers: [EnvsService],
  exports: [EnvsService, CryptographyModule, AuthModule],
})
export class ConfigModule {}
