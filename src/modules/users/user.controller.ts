import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { userService } from './user.service';
import { CreateUserDto } from 'src/dtos/createUser';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: userService) {}

  @Get('getUsers')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Patch('/actualizar-usuario/:id')
  updateUserHandler(
    @Param(':id', ParseUUIDPipe) id,
    @Body() newData: Partial<User>,
  ) {
    return this.userService.updateUserHandler(id, newData);
  }

  @Post('user-create')
  postUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.postUser(createUserDto);
  }

  @Delete('/user-delete/:id')
  deleteUser(@Param(':id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }

  @Put('UserAdmin')
  putUserAdmin(@Body(ParseUUIDPipe) id: string) {
    return this.userService.putUserAdmin(id);
  }

  @Get('user/:id')
  getUserById(@Param(':id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

  @Put('user-ban')
  banUser(@Body(ParseUUIDPipe) id: string) {
    return this.userService.banUser(id);
  }

  @Put('firstchips')
  firstChips(@Body(ParseUUIDPipe) id: string) {
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

  @Put('inactivar-user')
  inactiveUser(@Body(ParseUUIDPipe) id: string) {
    return this.userService.inactiveUser(id);
  }
}
