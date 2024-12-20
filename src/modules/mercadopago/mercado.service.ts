import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Pay } from '../pay/pay.entity';
import { DataSource, Repository } from 'typeorm';
import { userRespository } from '../users/user.repository';
import { PayRepository } from '../pay/pay.repository';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/user.entity';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

@Injectable()
export class MercadoService {
  constructor(
    private readonly userRepository: userRespository,
    private readonly payRepository: PayRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Pay) private readonly payDBRepository: Repository<Pay>,
  ) {}

  async createOrder(orderDto) {
    const { userId, chips, paymentPlataform, price } = orderDto;
    return await this.dataSource.manager.transaction(async (manager) => {
      const uuid = uuidv4();
      const pagoB = this.payDBRepository.create({
        paymentId: String(uuid),
        paymentPlataform: paymentPlataform,
        price: price,
        chips: chips,
        user: userId,
        date: new Date().toISOString(),
      });
      await this.payDBRepository.save(pagoB);
      let pago = await this.payDBRepository.findOne({
        where: { paymentId: pagoB.paymentId },
      });

      const body = {
        items: [
          {
            id: pago.paymentId,
            title: 'Chips',
            quantity: 1,
            unit_price: Number(pago.price),
            currency_id: 'ARS',
          },
        ],
        back_urls: {
          success: 'https://royalgames.me',
          pending: 'https://royalgames.me',
          failure: 'https://royalgames.me',
        },
        auto_return: 'approved',
      };
      try {
        const preference = await new Preference(client).create({ body });
        const user = await this.userRepository.getUserById(userId);

        if (!user) {
          throw new BadRequestException('User not found');
        }
        pago = {
          ...pago,
          paymentId: preference.id,
          user: userId,
          chips: chips,
          paymentPlataform: paymentPlataform,
          price: price,
          date: new Date().toISOString(),
        };
        await this.payDBRepository.save(pago);
        await manager.save(User, user);
      } catch (error) {
        console.log(error);
        throw new BadRequestException('Error creating order');
      }
    });
  }
}
