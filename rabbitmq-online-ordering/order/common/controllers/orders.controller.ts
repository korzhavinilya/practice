import OrderService from '../services/order.service';

export default class OrderController {
  static async create(data: any) {
    return OrderService.create(data);
  }
}
