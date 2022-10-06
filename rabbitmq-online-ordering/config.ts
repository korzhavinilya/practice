const config = {
  rabbitMQ: {
    url: 'amqp://rootuser:rootpass@localhost',
    directExchangeType: 'direct',
    orderExchange: 'OrderExchange',
    orderQueue: 'OrderQueue',
    acceptOrderRoutingKey: 'acceptOrder',

    warehouseExchange: 'WarehouseExchange',
    warehouseQueue: 'WarehouseQueue',
    checkExistenceRoutingKey: 'checkExistence',

    paymentExchange: 'PaymentExchange',
    paymentQueue: 'PaymentQueue',
    performPaymentRoutingKey: 'performPayment',
  },
};

export default config;
