import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtValidateInvite2 extends PassportStrategy(
  Strategy,
  "jwt-validate-invite"
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("USER_INVITE_SECRET"),
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    return payload;
  }
}
