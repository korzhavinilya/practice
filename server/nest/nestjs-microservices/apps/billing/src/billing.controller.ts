import { Controller, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { EventPattern, Payload, RmqContext, Ctx } from '@nestjs/microservices';
import { JwtAuthGuard, RmqPatterns, RmqService } from '@app/common';
import { CreateOrderRequest } from '@app/common';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern(RmqPatterns.ORDER_CREATED)
  @UseGuards(JwtAuthGuard)
  async handleOrderCreated(
    @Payload() data: CreateOrderRequest,
    @Ctx() context: RmqContext,
  ) {
    this.billingService.bill(data);
    this.rmqService.ack(context);
  }
}
