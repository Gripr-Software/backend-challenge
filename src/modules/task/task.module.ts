import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import { User } from "../user/model/user.model";
import { TaskController } from "./controllers/task.controller";
import { Task } from "./models/task.model";
import { TaskService } from "./services/task.service";

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    SequelizeModule.forFeature([Task, User]),
  ],
  providers: [TaskService, ],
  exports: [TaskService, ],
  controllers: [TaskController, ],
})
export class TaskModule {}
