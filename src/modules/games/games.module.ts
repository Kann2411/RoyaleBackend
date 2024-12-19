import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GamesRepository } from './games.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './games.entity';
import { userRespository } from '../users/user.repository';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, User])],
  controllers: [GamesController],
  providers: [GamesService, GamesRepository, userRespository],
})
export class GamesModule {}
