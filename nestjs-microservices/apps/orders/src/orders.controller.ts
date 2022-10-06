import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderRequest } from '@app/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '@app/common';

@Controller('orders')
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);

  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOrders(@Req() req: any) {
    this.logger.log(`user from request: ${JSON.stringify(req.user)}`);
    return this.ordersService.getOrders();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    return this.ordersService.createOrder(request, req.cookies?.Authentication);
  }
}
