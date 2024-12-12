import { Injectable } from '@nestjs/common';

@Injectable()
export class userRespository {
  async getAllUsers() {
    return [
      {
        id: 1,
        image: 'https://picsum.photos/200/300',
        nick: 'Kann',
        email: 'kann@gmail.com',
        admin: true,
        avatar: 'cualquiera',
        banned: false,
        inactive: false,
        age: 21,
        description: 'this is Kann',
        favorites: 'las mujeres',
        country: 'las vegas',
        chips: 10000,
        password: 'industriales',
        firstChips: true,
      },
      {
        id: 2,
        image: 'https://picsum.photos/200/300',
        nick: 'Kann2',
        email: 'kann2@gmail.com',
        admin: true,
        avatar: 'cualquiera',
        banned: false,
        inactive: false,
        age: 21,
        description: 'this is Kann2',
        favorites: 'las mujeres "2"',
        country: 'las vegas',
        chips: 10000,
        password: 'industriales',
        firstChips: true,
      },
    ];
  }

  async updateUserHandler(id) {
    return { message: `user whith id ${id} update succesfull` };
  }

  async createUser(nick, email, password, image, avatar, age, country, chips) {
    return { message: `user whith nick ${nick} create succesfull` };
  }

  async deleteUser(id: string) {
    return { message: `user whith id ${id} delete succesfull` };
  }

  async putUserAdmin(id: string) {
    return { messaje: `user whith id ${id} update succesfull` };
  }

  async getUserById(id: string) {
    return { messaje: `user whith id ${id} get succesfull` };
  }

  async banUser(id: string) {
    return { message: `user whith id ${id} ban succesfull` };
  }

  async firstChips(id: string) {
    return { message: `user whith id ${id} first chips succesfull` };
  }

  async getUserByEmail(email: string) {
    return { message: `user whith email ${email} get succesfull` };
  }

  async getUserByNick(nick: string) {
    return { message: `user whith nick ${nick} get succesfull` };
  }

  async inactiveUser(id: string) {
    return { message: `user whith id ${id} inactive succesfull` };
  }
}
