import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RmqPatterns } from '@app/common';
import { BILLING_SERVICE } from './constants/services';
import { CreateOrderRequest } from '@app/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private readonly billingClient: ClientProxy,
  ) {}

  async getOrders() {
    return this.ordersRepository.find({});
  }

  async createOrder(request: CreateOrderRequest, authentication: string) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session });
      await lastValueFrom(
        this.billingClient.emit(RmqPatterns.ORDER_CREATED, {
          request,
          Authentication: authentication,
        }),
      );
      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }
}
