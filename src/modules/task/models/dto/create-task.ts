import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(255)
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  dueDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  done: boolean;
}
