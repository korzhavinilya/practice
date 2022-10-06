import { Controller, Get } from '@nestjs/common';
import { UnitTestingService } from './unit-testing.service';

@Controller('unit-testing')
export class UnitTestingController {
  constructor(private readonly unitTestingService: UnitTestingService) {}

  @Get()
  findAll() {
    return this.unitTestingService.findAll();
  }
}
