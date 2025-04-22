import { HashComparer, HashGenerator } from '@core/types';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  generateHash(value: string): Promise<string> {
    return hash(value, 8);
  }

  compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }
}
