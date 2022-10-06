import { Module } from '@nestjs/common';
import { UnitTestingModule } from './modules/unit-testing/unit-testing.module';

@Module({
  imports: [UnitTestingModule],
})
export class AppModule {}
