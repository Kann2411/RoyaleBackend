import { Controller, Post } from '@nestjs/common';
import { PayService } from './pay.service';
import { CreateOrderMercadoPagoDto } from 'src/dtos/OrderMercadoPago';

@Controller()
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Post('/mepago/create-order')
  createOrderMercadoPago(createorderDto: CreateOrderMercadoPagoDto) {
    return this.payService.createOrderMercadoPago(createorderDto);
  }
}
