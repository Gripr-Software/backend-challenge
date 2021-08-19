import {
  Body,
  Controller,
  Post,
  Get,
  Headers,
  UseGuards,
  UseFilters,
  UnauthorizedException,
  Put,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./decorator";
import { User } from "../user/model/user.model";
import { ApiAuthCredentialsDto } from "./dto/api-auth-credentials.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: "Create new domain, user and connect them" })
  @Get("/me")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  me(@GetUser() user: User) {
    return this.authService.me(user);
  }

  @Post("credential")
  @ApiOperation({ summary: "Request for access token" })
  async credential(@Body() credentials: ApiAuthCredentialsDto): Promise<any> {
    return await this.authService.credential(credentials);
  }
  
}
