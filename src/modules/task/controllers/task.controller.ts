import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Headers,
  UseGuards,
  ParseUUIDPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { GetUser } from "src/modules/auth/decorator";
import { User } from "src/modules/user/model/user.model";
import { CreateTaskDto } from "../models/dto/create-task";
import {
  ITaskResponse,
  ITasksResponse,
  TaskResponseDto,
  TasksResponseDto,
} from "../models/dto/task.dto";
import { UpdateTaskDto } from "../models/dto/update-task";
import { TaskService } from "../services/task.service";

@ApiTags("task")
@Controller("task")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class TaskController {
  constructor(
    private taskService: TaskService,
  ) {}

  @Get("")
  @ApiOperation({
    summary: "Get tasks",
    description: "Get tasks",
  })
  @ApiOkResponse({
    description: "The tasks has successfully been fetched.",
    type: TasksResponseDto,
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  async getTasks(
    @Headers("domain") domainId: string,
    @GetUser() user: User
  ): Promise<ITasksResponse> {
    return await this.taskService.getTasks({
      user,
      domainId,
    });
  }

  @Post("")
  @ApiOperation({
    summary: "Create task",
    description: "Create task",
  })
  @ApiOkResponse({
    description: "The task has successfully been created.",
    type: TaskResponseDto,
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  async createTask(
    @Headers("domain") domainId: string,
    @GetUser() user: User,
    @Body() body: CreateTaskDto
  ): Promise<ITaskResponse> {
    return await this.taskService.createTask(
      {
        ...body,
      },
      {
        user,
        domainId,
      }
    );
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get task",
    description: "Get task by id",
  })
  @ApiOkResponse({
    description: "The task has successfully been fetched.",
    type: TaskResponseDto,
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  async getTask(
    @Headers("domain") domainId: string,
    @GetUser() user: User,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string
  ): Promise<ITaskResponse> {
    return await this.taskService.getTask(id, {
      user,
      domainId,
    });
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update task",
    description: "Update task by id",
  })
  @ApiOkResponse({
    description: "The task has successfully been fetched.",
    type: TaskResponseDto,
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  async updateTask(
    @Headers("domain") domainId: string,
    @GetUser() user: User,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() body: UpdateTaskDto
  ): Promise<ITaskResponse> {
    return await this.taskService.updateTask(id, {
      ...body,
      user,
      domainId,
    });
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete task",
    description: "Delete task by id",
  })
  @ApiOkResponse({
    description: "The task has successfully been deleted.",
    type: TaskResponseDto,
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  async deleteTask(
    @Headers("domain") domainId: string,
    @GetUser() user: User,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string
  ): Promise<ITaskResponse> {
    return await this.taskService.deleteTask(id, {
      user,
      domainId,
    });
  }
}
