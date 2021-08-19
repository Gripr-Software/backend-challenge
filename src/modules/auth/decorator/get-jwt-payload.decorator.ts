import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Jwt } from "../model/jwt.interface";

export const GetJwtPayload = createParamDecorator(
  (data, ctx: ExecutionContext): Jwt => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
