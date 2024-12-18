import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { userRespository } from '../users/user.repository';
import { CreateUserDto } from 'src/dtos/createUser';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: userRespository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userDto: CreateUserDto): Promise<Omit<User, 'role'>> {
    try {
      console.log(userDto);
      const { email, password, nick, image, avatar, age, country, chips } =
        userDto;
      const existingUser = await this.userRepository.getUserByEmail(email);
      console.log(existingUser);

      if (existingUser) {
        throw new BadRequestException('Email is already in use');
      }
      console.log('pasé el if de existingUser');
      const newUser = await this.userRepository.createUser(
        nick,
        email,
        password,
        image,
        avatar,
        age,
        country,
        chips,
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { role, ...rest } = newUser;

      return rest;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  async signIn(email, password) {
    try {
      if (!email || !password) {
        throw new BadRequestException('Email and password required');
      }

      const user = await this.userRepository.getUserByEmail(email);

      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
      if (user.banned) {
        throw new BadRequestException('Your account has been baned');
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new BadRequestException('Invalid Credentials');
      }
      const payload = {
        id: user.id,
        email: user.email,
        roles: user.role,
      };

      const token = this.jwtService.sign(payload);
      return {
        message: 'login Succesfull',
        token,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error login user', HttpStatus.BAD_REQUEST);
    }
  }
}
