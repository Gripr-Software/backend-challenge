import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./model/user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  async findUsers(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findUser(id: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id,
      } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    const user = await this.userModel.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const oldObject: any = JSON.parse(JSON.stringify(user));
    if (updateUserDto.firstName !== undefined) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName !== undefined) {
      user.lastName = updateUserDto.lastName;
    }

    return await user.save();
  }

  async delete(id: string): Promise<User> {

    const myUser = await this.userModel.findOne({ where: { id } });

    if (!myUser) {
      throw new NotFoundException("User not found");
    }
    
    await myUser.destroy();

    return myUser;
  }
}
