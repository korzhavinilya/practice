import { Injectable } from '@nestjs/common';

@Injectable()
export class UnitTestingService {
  findAll() {
    return ['unit', 'testing', 'service'];
  }
}
