import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { userService } from './user.service';
import { User } from './user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: userService) {}

  @Get('getUsers')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put('/actualizar-usuario/:id')
  updateUserHandler(
    @Param('id', ParseUUIDPipe) id,
    @Body() newData: Partial<User>,
  ) {
    return this.userService.updateUserHandler(id, newData);
  }

  @Delete('/user-delete/:id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }

  @Patch('userAdmin')
  putUserAdmin(@Body('id', ParseUUIDPipe) id: string) {
    return this.userService.putUserAdmin(id);
  }

  @Get('user/:id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

  @Patch('user-ban')
  banUser(@Body('id', ParseUUIDPipe) id: string) {
    return this.userService.banUser(id);
  }

  @Patch('firstchips')
  firstChips(@Body('id', ParseUUIDPipe) id: string) {
    return this.userService.firstChips(id);
  }

  @Get('user-email')
  getUserByEmail(@Query('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Get('user-nick')
  gerUserByNick(@Query('nick') nick: string) {
    return this.userService.getUserByNick(nick);
  }

  @Patch('inactivar-user')
  inactiveUser(@Body('id', ParseUUIDPipe) id: string) {
    return this.userService.inactiveUser(id);
  }
}
