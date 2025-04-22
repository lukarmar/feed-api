import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { EnvsService } from '@core/configs/envs/service';
import { IsEmail, IsString, IsUUID, validate } from 'class-validator';


export class TokenPayload {

  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @IsEmail()
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(envService: EnvsService) {
    const publicKey = envService.getEnv('JWT_PUBLIC_KEY');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: TokenPayload) {
    const errors = await validate(payload);
    if (errors.length > 0) {
      throw new Error('Invalid token payload');
    }
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
