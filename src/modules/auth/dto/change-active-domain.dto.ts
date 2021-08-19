import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsNotEmpty } from "class-validator";

export class ChangeActiveDomainDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  domainId: string;
}
