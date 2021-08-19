import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../user/model/user.model";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {
  JwtRegisterStrategy,
  JwtStrategy,
  JwtApiStrategy,
  JwtAuthStrategy,
} from "./passport";

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    SequelizeModule.forFeature([
      User,
    ]),
  ],
  providers: [
    JwtStrategy,
    JwtApiStrategy,
    JwtRegisterStrategy,
    JwtAuthStrategy,
    AuthService,
  ],
  controllers: [AuthController],
  exports: [
    JwtStrategy,
    JwtApiStrategy,
    JwtRegisterStrategy,
    JwtAuthStrategy,
    PassportModule,
  ],
})
export class AuthModule {}
