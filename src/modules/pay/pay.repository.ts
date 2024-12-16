import { Injectable } from '@nestjs/common';

@Injectable()
export class PayRepository {
  async createOrderMercadoPago(userId, price, date, paymentPlataform, chips) {}
}
