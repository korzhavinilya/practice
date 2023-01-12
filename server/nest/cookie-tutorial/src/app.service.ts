import { Injectable } from '@nestjs/common';
import { CookiesService } from './cookies/cookies.service';

@Injectable()
export class AppService {
  constructor(public cookieService: CookiesService) {}

  getHello(): string {
    this.cookieService.greeting();
    return 'Hello World!';
  }
}
