import { Injectable } from '@nestjs/common';
import { userRespository } from './user.repository';
import { CreateUserDto as CreateUserDto } from 'src/dtos/createUser';

@Injectable()
export class userService {
  constructor(private readonly userRespository: userRespository) {}

  getAllUsers() {
    return this.userRespository.getAllUsers();
  }
  updateUserHandler(id, newData) {
    return this.userRespository.updateUserHandler(id, newData);
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

  deleteUser(id: string) {
    return this.userRespository.deleteUser(id);
  }

  putUserAdmin(id: string) {
    return this.userRespository.putUserAdmin(id);
  }

  getUserById(id: string) {
    return this.userRespository.getUserById(id);
  }

  banUser(id: string) {
    return this.userRespository.banUser(id);
  }

  firstChips(id: string) {
    return this.userRespository.firstChips(id);
  }

  getUserByEmail(email: string) {
    return this.userRespository.getUserByEmail(email);
  }

  getUserByNick(nick: string) {
    return this.userRespository.getUserByNick(nick);
  }

  inactiveUser(id: string) {
    return this.userRespository.inactiveUser(id);
  }
}
