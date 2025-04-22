import { Module } from '@nestjs/common';
import { BcryptHasher, JwtEncrypter } from '@core/configs/cryptography';
import { Encrypter, HashComparer, HashGenerator } from '@core/types';


@Module({
  providers: [
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    }
  ],
  exports: [HashGenerator, Encrypter, HashComparer],
})
export class CryptographyModule {}
