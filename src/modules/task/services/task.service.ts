import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { User } from "src/modules/user/model/user.model";
import { CreateTaskDto } from "../models/dto/create-task";
import { ITaskResponse, ITasksResponse } from "../models/dto/task.dto";
import { IUpdateTaskArgs } from "../models/dto/update-task";
import { Task } from "../models/task.model";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private readonly taskModel: typeof Task,
  ) {}

  async getTasks({ user, domainId }): Promise<ITasksResponse> {
    const tasks = await this.taskModel.findAll({
      where: {
        domainId,
        [Op.or]: [{ ownerId: user.id }, { "$members.id$": user.id }],
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          association: "owner",
        },
        {
          association: "members",
        },
      ],
    });

    return { tasks };
  }

  async getTask(id: string, { user, domainId }): Promise<ITaskResponse> {
    const task = await this.getTaskByUser(id, user, domainId);

    if (!task) {
      throw new NotFoundException("Task not found");
    }

    return { task };
  }

  async createTask(
    body: CreateTaskDto,
    { user, domainId }
  ): Promise<ITaskResponse> {
    const newTask = await new Task({
      ...body,
      ownerId: user.id,
      domainId,
    });

    const task = await this.getTaskByUser(newTask.id, user, domainId);

    return { task };
  }

  async updateTask(
    id: string,
    {
      name,
      description,
      dueDate,
      done,
      ownerId,
      memberId,
      user,
      domainId,
    }: IUpdateTaskArgs
  ): Promise<ITaskResponse> {
    const task = await this.getTaskByUser(id, user, domainId);

    if (!task) {
      throw new NotFoundException(`Task was not found`);
    }

    const oldObject: any = task.toJSON();
    if (typeof name === "string") {
      task.name = name;
    }
    if (typeof description === "string") {
      task.description = description;
    }
    if (dueDate !== undefined) {
      task.dueDate = dueDate;
    }
    if (done !== undefined) {
      task.done = done;
    }
    if (ownerId !== undefined) {
      task.ownerId = ownerId;
    }
    if (memberId !== undefined) {
      const members = [];
      if (memberId) {
        members.push(memberId);
      }
    }
    await task.save();

    const updatedTask = await this.getTaskByUser(id, user, domainId);

    return { task: updatedTask };
  }

  async deleteTask(id: string, { user, domainId }) {
    const task = await this.getTaskByUser(id, user, domainId);

    if (!task) {
      throw new NotFoundException("Task not found");
    }

    const oldObject: any = task.toJSON();
    await task.destroy();

    return { task };
  }

  private async getTaskByUser(id: string, user: User, domainId: string) {
    const task = await this.taskModel.findOne({
      where: {
        id,
        domainId,
        [Op.or]: [{ ownerId: user.id }, { "$members.id$": user.id }],
      },
      include: [
        {
          association: "owner",
        },
        {
          association: "members",
        },
      ],
    });

    return task;
  }
}
