import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Jwt } from "../model/jwt.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtRegisterStrategy extends PassportStrategy(
  Strategy,
  "jwt-register"
) {
  constructor(private configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${configService.get<string>(
          "AUTH0_DOMAIN"
        )}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: "http://localhost:3000",
      issuer: `https://${configService.get<string>("AUTH0_DOMAIN")}/`,
    });
  }

  async validate(payload: Jwt, done: VerifiedCallback) {
    return payload;
  }
}
