import { Module } from '@nestjs/common';
import { UnitTestingController } from './unit-testing.controller';
import { UnitTestingService } from './unit-testing.service';

@Module({
  controllers: [UnitTestingController],
  providers: [UnitTestingService],
})
export class UnitTestingModule {}
