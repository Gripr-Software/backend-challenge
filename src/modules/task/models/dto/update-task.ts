import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsOptional,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";
import { User } from "src/modules/user/model/user.model";

export interface IUpdateTaskArgs {
  name: string;
  description: string;
  dueDate: Date;
  done: boolean;
  ownerId: string;
  memberId: string;
  user: User;
  domainId: string;
}

export class UpdateTaskDto {
  @ApiPropertyOptional()
  @IsOptional()
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  ownerId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  memberId: string;
}
