import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "src/modules/user/model/user.model";
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from "@nestjs/sequelize";
import { Task } from "src/modules/task/models/task.model";

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: "postgres",
      host: this.configService.get<string>("DATABASE_HOST"),
      port: this.configService.get<number>("DATABASE_PORT"),
      database: this.configService.get<string>("DATABASE_NAME"),
      username: this.configService.get<string>("DATABASE_USERNAME"),
      password: this.configService.get<string>("DATABASE_PASSWORD"),
      synchronize: true,
      autoLoadModels: true,
      logging: false,
      dialectOptions: {
        ssl: true,
      },
      models: [
        User,
        Task,
      ],
    };
  }
}
