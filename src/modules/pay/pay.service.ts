import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PayRepository } from './pay.repository';
import { PayDto } from 'src/dtos/payDto';
import { userRespository } from '../users/user.repository';

@Injectable()
export class PayService {
  constructor(
    private readonly payRepository: PayRepository,
    private readonly userRepository: userRespository,
  ) {}

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

  async createPay(pay: PayDto) {
    const { paymentPlataform, price, chips, userId, date, paymentId } = pay;

    try {
      let newPay = await this.payRepository.findOnePay({
        paymentId,
        userId: userId.toString(),
        date: date.toString(),
        paymentPlataform: paymentPlataform.toString(),
        chips,
        price: price.toString(),
      });

      if (!newPay) {
        newPay = await this.payRepository.createPay({
          paymentId,
          userId: userId.toString(),
          date: date.toString(),
          paymentPlataform: paymentPlataform.toString(),
          chips,
          price: price.toString(),
        });
      }

      const user = await this.userRepository.getUserById(userId);
      if (user) {
        user.payments = user.payments ? [...user.payments, newPay] : [newPay];
        await this.userRepository.save(user);
      } else {
        throw new NotFoundException('User not found');
      }

      return newPay;
    } catch (error) {
      throw new BadRequestException(`Error creating payment: ${error.message}`);
    }
  }
}
