import { Module } from '@nestjs/common';
import { PayService } from './pay.service';
import { PayController } from './pay.controller';
import { PayRepository } from './pay.repository';

@Module({
  imports: [],
  controllers: [PayController],
  providers: [PayService, PayRepository],
})
export class PayModule {}
