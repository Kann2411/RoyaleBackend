import { Injectable } from '@nestjs/common';
import { GamesRepository } from './games.repository';
import { CreateGameDto } from 'src/dtos/createGame';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}

  getFavoriteGames(userId: string) {
    return this.gamesRepository.getFavoriteGames(userId);
  }

  addFavoriteGame(userId: string, gameId: string) {
    return this.gamesRepository.addFavoriteGame(userId, gameId);
  }

  removeFavoriteGame(userId: string, gameId: string) {
    return this.gamesRepository.removeFavoriteGame(userId, gameId);
  }

  createGame(game: CreateGameDto) {
    return this.gamesRepository.createGame(game);
  }
}
