/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pay } from './pay.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PayDto } from 'src/dtos/payDto';

@Injectable()
export class PayRepository {
  constructor(
    @InjectRepository(Pay)
    private readonly payRepository: Repository<Pay>,
  ) {}

  async createOrderMercadoPago(userId, price, date, paymentPlataform, chips) {}

  async findOnePay(criteria: any): Promise<Pay> {
    return await this.payRepository.findOne({ where: criteria });
  }

  async createPay(payData: Partial<PayDto>): Promise<Pay> {
    const pay = this.payRepository.create(payData);
    return await this.payRepository.save(pay);
  }
}
