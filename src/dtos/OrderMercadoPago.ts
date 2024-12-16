export class CreateOrderMercadoPagoDto {
  userId: string;
  price: number;
  date: string;
  paymentPlataform: string;
  chips: number;
}
