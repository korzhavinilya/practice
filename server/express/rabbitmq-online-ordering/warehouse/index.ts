import amqplib, { Channel, Connection } from 'amqplib';
import express, { Request, Response } from 'express';
import config from '../config';

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

let channel: Channel, connection: Connection;

connect();

async function connect() {
  try {
    const amqpServer = config.rabbitMQ.url;
    connection = await amqplib.connect(amqpServer);
    channel = await connection.createChannel();

    await channel.bindQueue(
      config.rabbitMQ.orderQueue,
      config.rabbitMQ.directExchangeName,
      config.rabbitMQ.carsRoutingKey
    );

    await channel.bindQueue(
      config.rabbitMQ.orderQueue2,
      config.rabbitMQ.fanoutExchangeName,
      config.rabbitMQ.fanoutRoutingKey
    );

    if (PORT === '3002') {
      await channel.assertQueue(config.rabbitMQ.orderQueue2);

      await channel.consume(config.rabbitMQ.orderQueue2, (data) => {
        console.log(
          `Received on the port ${PORT} ${Buffer.from(data!.content)}`
        );
        channel.ack(data!);
      });
    }

    await channel.consume(config.rabbitMQ.orderQueue, (data) => {
      console.log(`Received on the port ${PORT} ${Buffer.from(data!.content)}`);
      channel.ack(data!);
    });
  } catch (error) {
    console.log(error);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
