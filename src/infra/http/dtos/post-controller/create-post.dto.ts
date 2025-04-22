import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePostDto {
  @ApiProperty({
    description: 'Content of the post',
    example: 'This is a post content',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 500)
  content: string;
}