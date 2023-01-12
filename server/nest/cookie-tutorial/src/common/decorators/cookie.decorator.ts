import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

const CookieDecorator = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const http = context.switchToHttp();
    const request: Request = http.getRequest();
    const value = request.cookies[key];
    return value || null;
  },
);

export default CookieDecorator;
