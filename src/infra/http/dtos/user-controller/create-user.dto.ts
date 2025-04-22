import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)  
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john.dow@email.com'
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123'
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @ApiProperty({
    description: 'Confirm password of the user',
    example: 'password123'
  })
  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  @Length(6, 20)
  confirmPassword: string;
}