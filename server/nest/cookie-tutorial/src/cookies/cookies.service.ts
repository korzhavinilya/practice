import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CookiesService {
  constructor(@Inject('TOKEN') fn: () => void) {
    fn();
  }

  greeting() {
    console.log('Hello');
  }
}
