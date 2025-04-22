import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtAuthGuard, JwtStrategy } from '@core/configs/auth';
import { EnvsService } from '@core/configs/envs/service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [EnvsService],
      global: true,
      useFactory(env: EnvsService) {
        const privateKey = env.getEnv('JWT_PRIVATE_KEY');
        const publicKey = env.getEnv('JWT_PUBLIC_KEY');
        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    EnvsService,
  ],
})
export class AuthModule {}
