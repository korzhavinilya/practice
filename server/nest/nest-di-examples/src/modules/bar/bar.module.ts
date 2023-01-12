import { Module } from '@nestjs/common';
import { BarService } from './bar.service';

@Module({
  providers: [
    {
      provide: 'BAR_SERVICE',
      useClass: BarService,
    },
  ],
  exports: ['BAR_SERVICE'],
})
export class BarModule {}
