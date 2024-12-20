import { BadRequestException, Injectable } from '@nestjs/common';
import { PayDto } from 'src/dtos/payDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pay } from '../pay/pay.entity';
import { Repository } from 'typeorm';
import { userRespository } from '../users/user.repository';
import { PayRepository } from '../pay/pay.repository';
import { MercadoPagoConfig, Payment } from 'mercadopago';

@Injectable()
export class MercadoService {
  private client: MercadoPagoConfig;
  private payment: Payment;

  constructor(
    private readonly userRepository: userRespository,
    private readonly payRepository: PayRepository,
    @InjectRepository(Pay) private readonly payDBRepository: Repository<Pay>,
  ) {
    // Step 2: Initialize the client object
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
      options: { timeout: 5000 },
    });

    // Step 3: Initialize the API object
    this.payment = new Payment(this.client);
  }

  async createOrder(orderDto: PayDto): Promise<string> {
    const { paymentPlataform, price, chips, userId, date } = orderDto;

    const body = {
      transaction_amount: parseFloat(price),
      description: `${chips} chips`,
      payment_method_id: 'credit_card', // Ajusta según el método de pago real
      payer: {
        email: '<EMAIL>', // Reemplaza con el email del usuario
      },
      metadata: {
        userId,
        date,
        paymentPlataform,
        chips,
      },
    };

    const requestOptions = {
      idempotencyKey: `order-${userId}-${Date.now()}`,
    };

    try {
      // Aquí estamos usando el método 'create' para generar el pago.
      const paymentResponse = await this.payment.create({
        body,
        requestOptions,
      });

      // Aquí accedemos directamente a la respuesta del pago, que contiene el campo 'init_point'.
      return paymentResponse.init_point; // Regresa el URL de pago
    } catch (error) {
      console.error('Error creating order:', error);
      throw new BadRequestException('Error creating order');
    }
  }

  async receiveWebhook(paymentData: any): Promise<any> {
    if (paymentData.type !== 'payment') {
      throw new BadRequestException('Invalid payment type');
    }

    try {
      const paymentId = paymentData['data.id'];
      const paymentDetails = await this.payment.get(paymentId);

      // Acceder a la respuesta correctamente
      const pay = {
        userId: paymentDetails.response.metadata.userId, // Usa 'response'
        chips: paymentDetails.response.metadata.chips,
        paymentPlataform: paymentDetails.response.metadata.paymentPlataform,
        date: paymentDetails.response.metadata.date,
        paymentId: paymentDetails.response.id,
      };

      const existingPay = await this.payDBRepository.findOne({
        where: { paymentId: pay.paymentId },
      });

      if (existingPay) {
        return { message: 'Payment already exists' };
      }

      const chipsAdded = await this.userRepository.addChips(
        pay.userId,
        Number(pay.chips),
      );
      if (!chipsAdded) {
        throw new BadRequestException('Error adding chips');
      }

      const paymentRecorded = await this.payRepository.createPay(pay);
      if (!paymentRecorded) {
        await this.userRepository.addChips(pay.userId, -Number(pay.chips));
        throw new BadRequestException(
          'Error al registrar el pago, operación revertida.',
        );
      }

      return { message: 'Payment recorded successfully' };
    } catch (error) {
      console.error('Error receiving webhook:', error);
      throw new BadRequestException('Error receiving webhook');
    }
  }
}
