import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class userRespository {
  constructor(
    @InjectRepository(User) private readonly userDBRepository: Repository<User>,
  ) {}
  async getAllUsers() {
    return await this.userDBRepository.find();
  }

  async updateUserHandler(id, newData) {
    try {
      const user = await this.userDBRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const updatedUser = await this.userDBRepository.save({
        ...user,
        ...newData,
      });
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(
    nick,
    email,
    password,
    image,
    avatar,
    age,
    country,
    chips,
  ): Promise<User> {
    try {
      const newUser = this.userDBRepository.create({
        nick,
        email,
        password,
        image,
        avatar,
        age,
        country,
        chips,
      });
      if (password) {
        newUser.password = await bcrypt.hash(password, 10);
      }
      await this.userDBRepository.save(newUser);
      const userFind = await this.userDBRepository.findOneBy({ email });
      return userFind;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error creating User', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string) {
    try {
      const userFindById = await this.userDBRepository.findOneBy({ id });
      if (!userFindById)
        throw new NotFoundException(`User with id ${id} not found`);
      await this.userDBRepository.delete(id);
      return { message: `User with id ${id} deleted` };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error deleting User', HttpStatus.BAD_REQUEST);
    }
  }

  async putUserAdmin(id: string) {
    try {
      const userFindById = await this.userDBRepository.findOneBy({ id });
      if (!userFindById)
        throw new NotFoundException(`User with id ${id} not found`);
      userFindById.admin = true;
      await this.userDBRepository.save(userFindById);
      return { message: `User with id ${id} updated to admin` };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error updating User', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.userDBRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error getting User', HttpStatus.BAD_REQUEST);
    }
  }

  async banUser(id: string) {
    try {
      const user = await this.userDBRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      user.banned = true;
      return { message: `User with id ${id} banned` };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error banning User', HttpStatus.BAD_REQUEST);
    }
  }

  async firstChips(id: string) {
    try {
      const user = await this.userDBRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      user.firstChips = true;
      await this.userDBRepository.save(user);
      return { message: `User with id ${id} first chips` };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error firstChips User', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const userByEmail = await this.userDBRepository.findOneBy({ email });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = userByEmail;
      return rest;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error getting User by Email',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserByNick(nick: string) {
    try {
      const userByNick = await this.userDBRepository.findOneBy({ nick });
      if (!userByNick)
        throw new NotFoundException(`user with nick ${nick} not found`);
      return userByNick;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error getting User by Nick',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async inactiveUser(id: string) {
    try {
      const user = await this.userDBRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      user.inactive = true;
      await this.userDBRepository.save(user);
      return { message: `User with id ${id} inactive` };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error inactive User', HttpStatus.BAD_REQUEST);
    }
  }
}
