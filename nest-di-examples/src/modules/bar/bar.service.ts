import { Injectable } from '@nestjs/common';
import { IBarService } from './bar-service.interface';

@Injectable()
export class BarService implements IBarService {
  run(): string {
    return 'bar';
  }
}
