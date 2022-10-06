import { Module } from '@nestjs/common';
import { AbstractBazService } from './abstract-baz.service';
import { BazService } from './baz.service';

@Module({
  providers: [
    {
      provide: AbstractBazService,
      useClass: BazService,
    },
  ],
  exports: [AbstractBazService],
})
export class BazModule {}
