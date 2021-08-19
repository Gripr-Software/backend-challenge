import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, "jwt-auth") {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("AUTH0_CLIENT_SECRET"),
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    return payload;
  }
}
