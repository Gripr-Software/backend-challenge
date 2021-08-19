import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsString, IsUUID } from "class-validator";

export class UserDto {
  @ApiProperty({
    type: String,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  initials: string;

  @ApiProperty({
    type: String,
    description: "The Authentication ID",
  })
  @IsString()
  authId: string;

  @ApiProperty({
    type: Boolean,
    description: "If the user is active or not",
  })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    type: Date,
    description: "When the user last logged in",
  })
  @IsDate()
  lastLogin: Date;

  @ApiProperty({
    type: Date,
    description: "When the user was created",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: "When the user was updated",
  })
  @IsDate()
  updatedAt: Date;
}
