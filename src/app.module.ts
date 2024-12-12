import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { GamesModule } from './modules/games/games.module';

@Module({
  imports: [UsersModule, GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
