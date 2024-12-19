import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './games.entity';
import { Repository } from 'typeorm';
import { userRespository } from '../users/user.repository';
import { User } from '../users/user.entity';
import { CreateGameDto } from 'src/dtos/createGame';

@Injectable()
export class GamesRepository {
  constructor(
    @InjectRepository(Game) private readonly gamesDBRepositor: Repository<Game>,
    private readonly userRepository: userRespository,
    @InjectRepository(User) private readonly userDBRepository: Repository<User>,
  ) {}
  async getFavoriteGames(userId: string) {
    try {
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user.games;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error getting favorite games');
    }
  }

  async addFavoriteGame(userId: string, gameId: string) {
    try {
      const user = await this.userRepository.getUserById(userId);
      const game = await this.gamesDBRepositor.findOneBy({ id: gameId });
      if (!game || !user) {
        throw new NotFoundException('Game or user not found');
      }
      if (!user.games) {
        user.games = [];
      }

      user.games.push(game);
      await this.userDBRepository.save(user);
      return game;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error adding favorite game');
    }
  }

  async removeFavoriteGame(userId: string, gameId: string) {
    try {
      const user = await this.userRepository.getUserById(userId);
      const game = await this.gamesDBRepositor.findOneBy({ id: gameId });
      if (!game || !user) {
        throw new NotFoundException('Game or user not found');
      }
      if (!user.games) {
        user.games = [];
      }
      user.games = user.games.filter((g) => g.id !== game.id);
      await this.userDBRepository.save(user);
      return { message: 'Game removed' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error removing favorite game');
    }
  }

  async createGame(game: CreateGameDto) {
    try {
      const newGame = this.gamesDBRepositor.create(game);
      await this.gamesDBRepositor.save(newGame);
      return newGame;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error creating game');
    }
  }
}
