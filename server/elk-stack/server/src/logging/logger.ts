import winston from 'winston';
import ecsFormat from '@elastic/ecs-winston-format';

winston.loggers.add('appServiceLogger', {
  level: 'info',
  // defaultMeta: {
  //   service: 'App Service'
  // },
  format: ecsFormat({ convertReqRes: true }),
  transports: [new winston.transports.Console()]
});

winston.loggers.add('userServiceLogger', {
  level: 'info',
  // defaultMeta: {
  //   service: 'User Service'
  // },
  // format: winston.format.logstash(),
  transports: [
    new winston.transports.Console()
    // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

const appLogger = winston.loggers.get('appServiceLogger');
const userLogger = winston.loggers.get('userServiceLogger');

export { appLogger, userLogger };
