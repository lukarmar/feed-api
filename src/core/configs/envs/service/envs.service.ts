import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariablesValidation } from '@core/configs/envs/validation';

@Injectable()
export class EnvsService {
  constructor(private readonly configService: ConfigService<EnvironmentVariablesValidation, true>) {}
  getEnv<T extends keyof EnvironmentVariablesValidation>(key: T): EnvironmentVariablesValidation[T] {
    return this.configService.get(key, { infer: true });
  }
}
