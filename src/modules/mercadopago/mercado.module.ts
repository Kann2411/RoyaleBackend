import { Module } from '@nestjs/common';
import { MercadoController } from './mercado.controller';
import { MercadoService } from './mercado.service';
import { PayRepository } from '../pay/pay.repository';
import { userRespository } from '../users/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pay } from '../pay/pay.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pay, User])],
  controllers: [MercadoController],
  providers: [MercadoService, PayRepository, userRespository],
})
export class MercadoModule {}
