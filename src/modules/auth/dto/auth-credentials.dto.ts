import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";
export class AuthCredentialsDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])|(?=.*[A-Z])|(?=.*[a-z]).*$/, {
    message: "password is too weak",
  })
  password: string;
}
