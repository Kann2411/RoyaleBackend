import { Injectable } from '@nestjs/common';
import { PayRepository } from './pay.repository';

@Injectable()
export class PayService {
  constructor(private readonly payRepository: PayRepository) {}

  createOrderMercadoPago(createorderDto) {
    const { userid, price, date, paymentPlataform, chips } = createorderDto;

    return this.payRepository.createOrderMercadoPago(
      userid,
      price,
      date,
      paymentPlataform,
      chips,
    );
  }
}
