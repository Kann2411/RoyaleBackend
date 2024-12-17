import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userService } from './user.service';
import { userRespository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [userService, userRespository],
})
export class UsersModule {}
