import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from 'src/dtos/createGame';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('favorites/:userId')
  getFavoritesGames(@Param(':userId', ParseUUIDPipe) userId: string) {
    return this.gamesService.getFavoriteGames(userId);
  }

  @Post('favorites')
  addFavoriteGame(
    @Body('userId', ParseUUIDPipe) userId: string,
    @Body('gameId', ParseUUIDPipe) gameId: string,
  ) {
    return this.gamesService.addFavoriteGame(userId, gameId);
  }

  @Delete('favorites/:userId/:gameId')
  removeFavoriteGames(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('gameId', ParseUUIDPipe) gameId: string,
  ) {
    return this.gamesService.removeFavoriteGame(userId, gameId);
  }

  @Post()
  createGame(@Body() game: CreateGameDto) {
    return this.gamesService.createGame(game);
  }
}
