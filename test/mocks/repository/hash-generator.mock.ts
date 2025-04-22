import { HashGenerator } from '@core/types';

export const HashGeneratorMock: jest.Mocked<HashGenerator> = {
  generateHash: jest.fn(),
};
