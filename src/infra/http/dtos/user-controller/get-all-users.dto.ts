import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, Length } from "class-validator";
import PaginateDto  from "@infra/http/dtos/paginate.dto";

export class GetAllUsersDto extends PaginateDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @Length(3, 50)
  name?: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john.dow@email.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}