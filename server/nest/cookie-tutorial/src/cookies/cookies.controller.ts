import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import CookieDecorator from '../common/decorators/cookie.decorator';

const COOKIE_NAME = 'nestjs';

@Controller('cookies')
export class CookiesController {
  @Get()
  getAll(@Req() request: Request) {
    const cookies = request.cookies;
    console.log(cookies);
    return { cookies };
  }

  @Get('/specific')
  getSpecific(@CookieDecorator(COOKIE_NAME) value: string) {
    return { value };
  }

  @Post()
  create(@Res({ passthrough: true }) response: Response) {
    response.cookie(COOKIE_NAME, 'backend', {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    });
    response.status(201).send({ message: 'Cookie was created' });
  }
}
