import { Injectable } from '@nestjs/common';
import { AbstractBazService } from './abstract-baz.service';

@Injectable()
export class BazService extends AbstractBazService {
  run(): string {
    return 'baz';
  }
}
