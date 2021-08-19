import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../../user/model/user.model";
@Injectable()
export class JwtApiStrategy extends PassportStrategy(Strategy, "jwt-api") {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("API_SECRET"),
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const { domain, user, sub } = payload;
    if (!domain || !user) {
      throw new UnauthorizedException("domainId and userId is required");
    }
    const currentUser = await this.userModel.findOne({ where: { id: user } });

    if (!currentUser) {
      throw new UnauthorizedException("User not found");
    }

    const currentDomain = await this.domainModel.findOne({
      where: { id: domain },
    });

    if (!currentDomain) {
      throw new UnauthorizedException("Domain not found");
    }
    return { domain: currentDomain, user: currentUser, sub };
  }
}
