import express from 'express';
import RabbitMQ from './common/rabbitmq';

import ordersRouter from './common/routers/orders.router';

const PORT = 3000;
const app = express();
app.use(express.json());

app.use('/orders', ordersRouter);

app.listen(PORT, async () => {
  await RabbitMQ.connect();
  console.log(`Server running on ${PORT}`);
});
