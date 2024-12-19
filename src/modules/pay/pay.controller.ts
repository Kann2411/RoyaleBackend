import { Body, Controller, Post } from '@nestjs/common';
import { PayService } from './pay.service';
import { CreateOrderMercadoPagoDto } from 'src/dtos/OrderMercadoPago';
import { PayDto } from 'src/dtos/payDto';

@Controller()
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Post('mepago/create-order')
  createOrderMercadoPago(createorderDto: CreateOrderMercadoPagoDto) {
    return this.payService.createOrderMercadoPago(createorderDto);
  }

  @Post('newpay')
  async receiveWebhook(@Body() pay: PayDto) {
    return this.payService.createPay(pay);
  }
}
