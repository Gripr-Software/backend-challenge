import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  firstName: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  lastName: string;
}
