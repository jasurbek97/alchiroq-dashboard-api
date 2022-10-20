import { Controller, Delete, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all APP users 🧑' })
  @Get()
  findUserCount() {
    return this.userService.findAll();
  }

  //
  // @ApiOperation({ summary: 'Get all TG users 🧑' })
  // @Get('/tg')
  // findTgUserCount() {
  //   return this.userService.cacheTgUser();
  // }

  @ApiOperation({ summary: 'Delete all users 🧑' })
  @Delete()
  delete() {
    return this.userService.delete();
  }
}
