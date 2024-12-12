import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userService } from './user.service';
import { userRespository } from './user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [userService, userRespository],
})
export class UsersModule {}
