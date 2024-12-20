import { Body, Controller, Post } from '@nestjs/common';
import { PayDto } from 'src/dtos/payDto';
import { MercadoService } from './mercado.service';

@Controller()
export class MercadoController {
  constructor(private readonly mercadoService: MercadoService) {}

  @Post('mepago/create-order')
  createOrder(@Body() orderDto: PayDto) {
    return this.mercadoService.createOrder(orderDto);
  }

  // @Post('/mepago/webhook')
  // receiveWebhook(@Query() body: any) {
  //   return this.mercadoService.receiveWebhook(body);
  // }
}
