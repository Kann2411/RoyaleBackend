import { Injectable } from '@nestjs/common';
import { userRespository } from './user.repository';
import { CreateUserDto as CreateUserDto } from 'src/dtos/createUser';

@Injectable()
export class userService {
  constructor(private readonly userRespository: userRespository) {}

  getAllUsers() {
    return this.userRespository.getAllUsers();
  }
  updateUserHandler(id) {
    return this.userRespository.updateUserHandler(id);
  }

  postUser(createUserDto: CreateUserDto) {
    const { nick, email, password, image, avatar, age, country, chips } =
      createUserDto;
    return this.userRespository.createUser(
      nick,
      email,
      password,
      image,
      avatar,
      age,
      country,
      chips,
    );
  }
}
