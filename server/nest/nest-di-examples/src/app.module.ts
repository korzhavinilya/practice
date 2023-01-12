import { Module } from '@nestjs/common';
import { FooModule } from './modules/foo/foo.module';
import { BarModule } from './modules/bar/bar.module';
import { BazModule } from './modules/baz/baz.module';

@Module({
  imports: [FooModule, BarModule, BazModule],
})
export class AppModule {}
