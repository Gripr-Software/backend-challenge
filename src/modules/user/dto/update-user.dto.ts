import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength, IsOptional } from "class-validator";

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  lastName: string;
}
