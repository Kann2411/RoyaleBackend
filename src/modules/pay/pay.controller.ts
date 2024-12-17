import { Controller, Post, Query, Res } from '@nestjs/common';
import { PayService } from './pay.service';
import { CreateOrderMercadoPagoDto } from 'src/dtos/OrderMercadoPago';

@Controller()
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Post('mepago/create-order')
  createOrderMercadoPago(createorderDto: CreateOrderMercadoPagoDto) {
    return this.payService.createOrderMercadoPago(createorderDto);
  }

  @Post('mepago/webhook')
  async receiveWebhook(@Query('payment') payment: any, @Res() res: Response) {}
}
