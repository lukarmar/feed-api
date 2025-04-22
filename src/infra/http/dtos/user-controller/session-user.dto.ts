import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class SessionDto {
 @ApiProperty({
    description: 'Email of the user',
    example: 'john.dow@email.com'
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123'
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}