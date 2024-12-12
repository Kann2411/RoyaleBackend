import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { userService } from './user.service';
import { CreateUserDto } from 'src/dtos/createUser';

@Controller('users')
export class UserController {
  constructor(private readonly userService: userService) {}

  @Get('getUsers')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Patch('/actualizar-usuario/:id')
  updateUserHandler(@Param(':id', ParseUUIDPipe) id) {
    return this.userService.updateUserHandler(id);
  }

  @Post('user-create')
  postUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.postUser(createUserDto);
  }
}
