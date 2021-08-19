import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/modules/user/dto/user.dto";
import { Task } from "../task.model";
import { Type } from "class-transformer";

export class TaskDto {
  @ApiProperty({
    type: String,
    description: "Task id",
  })
  id: string;

  @ApiProperty({
    type: String,
    description: "Owner",
  })
  ownerId: string;

  @ApiProperty({
    type: String,
    description: "Task name",
  })
  name: string;

  @ApiProperty({
    type: String,
    description: "Task description",
  })
  description: string;

  @ApiProperty({
    type: Date,
    description: "Task due date",
  })
  dueDate: Date;

  @ApiProperty({
    type: String,
    description: "Task due date formatted",
  })
  dueDateFormatted: string;

  @ApiProperty({
    type: Boolean,
    description: "Task done flag",
  })
  done: boolean;

  @ApiProperty({
    type: Date,
    description: "Task updatedAt",
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    description: "Task updatedAt",
  })
  createdAt: Date;

  @ApiProperty({
    type: UserDto,
    description: "Owner object",
  })
  @Type(() => UserDto)
  owner: UserDto;

  @ApiProperty({
    type: [UserDto],
    description: "Owner object",
  })
  members: UserDto[];
}

export class TasksResponseDto {
  @ApiProperty({ type: [TaskDto] })
  tasks: TaskDto[];
}
export class TaskResponseDto {
  @ApiProperty({ type: TaskDto })
  task: TaskDto;
}

export interface ITasksResponse {
  tasks: Task[];
}

export interface ITaskResponse {
  task: Task;
}
