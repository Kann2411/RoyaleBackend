import { Module } from '@nestjs/common';
import { PayService } from './pay.service';
import { PayController } from './pay.controller';
import { PayRepository } from './pay.repository';
import { userRespository } from '../users/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pay } from './pay.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pay, User])],
  controllers: [PayController],
  providers: [PayService, PayRepository, userRespository],
})
export class PayModule {}
