import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(3, 50)  
  name?: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john.dow@email.com',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;
 }