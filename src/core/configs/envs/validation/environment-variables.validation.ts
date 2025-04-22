import { IsNumber, IsString } from "class-validator";


export class EnvironmentVariablesValidation {

  @IsString()
  NODE_ENV: string;

  @IsString()
  DATABASE_HOST: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;

  @IsNumber()
  API_PORT: number;

  @IsString()
  JWT_PUBLIC_KEY: string;

  @IsString()
  JWT_PRIVATE_KEY: string;
}