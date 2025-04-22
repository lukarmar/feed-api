import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',

  moduleFileExtensions: ['js', 'json', 'ts'],

  modulePaths: ['<rootDir>/src/'],
  testRegex: String.raw`.*\.spec\.ts$`,
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/src/domain/',
    '<rootDir>/src/core/',
    '<rootDir>/src/infra/',
    String.raw`\.module\.ts$`,
    String.raw`\.config\.ts$`,
    String.raw`\.d\.ts$`,
    String.raw`\config\.module\.ts$`,
    String.raw`\index\.ts$`,
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
  clearMocks: true,
};

export default config;
