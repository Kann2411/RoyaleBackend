import { Injectable } from '@nestjs/common';
import { userRespository } from './user.repository';

@Injectable()
export class userService {
  constructor(private readonly userRespository: userRespository) {}

  getAllUsers() {
    return this.userRespository.getAllUsers();
  }
  updateUserHandler(id, newData) {
    return this.userRespository.updateUserHandler(id, newData);
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

  removeChips(id: string, chips: number) {
    return this.userRespository.removeChips(id, chips);
  }

  addChips(id: string, chips: number) {
    return this.userRespository.addChips(id, chips);
  }
}
