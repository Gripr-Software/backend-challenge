import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "src/modules/user/model/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { AuthUserDto } from "./dto/auth-user.dto";
import { ConfigService } from "@nestjs/config";
import { Sequelize } from "sequelize";
import { ApiAuthCredentialsDto } from "./dto/api-auth-credentials.dto";

const Analytics = require("analytics-node");
const axios = require("axios").default;

export class AuthService {  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private sequelize: Sequelize,
    private configService: ConfigService,
  ) {
  }

  async me(reqUser: User) {
    let user = await this.userModel.findByPk(reqUser.id);

    if (!user || !user.active) {
      throw new UnauthorizedException("User not found or is inactive");
    }

    return user.toJSON();
  }

  async credential(credentials: ApiAuthCredentialsDto): Promise<any> {
    const { email, password } = credentials;

    try {
      const user = await this.userModel.findOne({
        where: { email },
      });
    } catch (err) {
      throw new NotFoundException(`User with email = "${email}" is not found`);
    }

    const dom = this.configService.get<string>("AUTH0_DOMAIN");
    const aud = this.configService.get<string>("AUTH0_AUDIENCE");
    const cid = this.configService.get<string>("AUTH0_CLIENT_ID");
    const seq = this.configService.get<string>("AUTH0_CLIENT_SECRET");
    const options = {
      method: "POST",
      url: `https://${dom}/oauth/token`,
      headers: { "content-type": "application/json" },
      data: {
        grant_type: "password",
        username: email,
        password,
        audience: aud,
        scope: "read:users",
        client_id: cid,
        client_secret: seq,
      },
    };

    try {
      const response = await axios(options);

      return {
        access_token: response.data.access_token,
        token_type: "Bearer",
      };
    } catch (err) {
      throw new ConflictException("Could not create access token");
    }
  }

  
}