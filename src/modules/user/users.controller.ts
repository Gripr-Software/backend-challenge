import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from "@nestjs/common";
import { User } from "./model/user.model";
import { UserService } from "./users.service";
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags("user")
@ApiBearerAuth()
@Controller("user")
@UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(
    private readonly usersService: UserService,
  ) {}

  @Get()
  @ApiOperation({ summary: "Find users" })
  @ApiOkResponse({ description: "The users are successfully been listed." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async findUsers(
  ): Promise<User[]> {
    return this.usersService.findUsers();
  }

  @Get("/:id")
  @ApiOperation({ summary: "Find user by id" })
  @ApiOkResponse({ description: "The user is successfully been listed." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async findUser(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<User> {
    return this.usersService.findUser(id);
  }

  @Put("/:id")
  @ApiOperation({ summary: "Update user by id" })
  @ApiOkResponse({ description: "The user is successfully been updated." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async updateUser(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Delete user by id" })
  @ApiOkResponse({ description: "The user is successfully been deleted." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async remove(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<User> {
    return this.usersService.delete(id);
  }
}
