import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "../../user/model/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private configService: ConfigService
  ) {
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
      audience: configService.get<string>("AUTH0_AUDIENCE"),
      issuer: `https://${configService.get<string>("AUTH0_DOMAIN")}/`,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const { sub } = payload;
    const user = await this.userModel.findOne({ where: { authId: sub } });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!user.active) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
