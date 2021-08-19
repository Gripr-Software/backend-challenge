import { IsObject, IsDefined } from "class-validator";

export class AuthUserDto {
  @IsDefined()
  @IsObject()
  user: any;

  @IsDefined()
  @IsObject()
  context: any;

  @IsDefined()
  @IsObject()
  query: any;
}
