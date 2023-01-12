import amqplib, { Channel, Connection } from 'amqplib';
import config from '../../../config';

let channel: Channel;
let connection: Connection;

export default class RabbitMQ {
  private constructor() {}

  static async connect() {
    const amqpServer = config.rabbitMQ.url;
    connection = await amqplib.connect(amqpServer);
    channel = await connection.createChannel();

    await channel.assertQueue(config.rabbitMQ.orderQueue);
    await channel.assertQueue(config.rabbitMQ.warehouseQueue);
    await channel.assertQueue(config.rabbitMQ.paymentQueue);

    await channel.assertExchange(
      config.rabbitMQ.orderExchange,
      config.rabbitMQ.directExchangeType
    );
    await channel.assertExchange(
      config.rabbitMQ.warehouseExchange,
      config.rabbitMQ.directExchangeType
    );
    await channel.assertExchange(
      config.rabbitMQ.paymentExchange,
      config.rabbitMQ.directExchangeType
    );
  }

  static async publishCheckExistenceMessage(data: any) {
    channel.publish(
      config.rabbitMQ.warehouseExchange,
      config.rabbitMQ.checkExistenceRoutingKey,
      Buffer.from(
        JSON.stringify({
          ...data,
          timestamp: Date.now(),
        })
      )
    );
  }
}
