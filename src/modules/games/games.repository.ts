import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesRepository {
  async getFavoriteGames(userId: string) {
    return {
      message: `aqui va la logica para traer los juegos favoritos del User ${userId}`,
    };
  }

  async addFavoriteGame(userId: string, gameId: string) {
    return { message: `add favorite game with id ${gameId} to user ${userId}` };
  }

  async removeFavoriteGame(userId: string, gameId: string) {
    return { message: `Game ${gameId} removed favorite the user ${userId}` };
  }

  async createGame(game) {
    return { message: `game created ${game}` };
  }
}
