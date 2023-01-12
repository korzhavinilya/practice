import { Module } from '@nestjs/common';
import { BarModule } from '../bar/bar.module';
import { BazModule } from '../baz/baz.module';
import { FooController } from './foo.controller';
import { FooService } from './foo.service';

@Module({
  controllers: [FooController],
  providers: [FooService],
  imports: [BarModule, BazModule],
})
export class FooModule {}
