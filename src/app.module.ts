import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/users.module";
import {
  validationSchema,
  SequelizeConfigService,
} from "./config";
import { AppController } from "./app.controller";
import { TaskModule } from "./modules/task/task.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    AuthModule,
    UserModule,
    TaskModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
