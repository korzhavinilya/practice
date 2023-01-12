import RabbitMQ from '../rabbitmq';

export default class OrderService {
  static async create(data: any) {
    await RabbitMQ.publishCheckExistenceMessage(data);
    return 'Order registered';
  }
}
