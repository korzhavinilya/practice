import { Module } from '@nestjs/common';
import { CookiesController } from './cookies.controller';
import { CookiesService } from './cookies.service';

@Module({
  controllers: [CookiesController],
  providers: [
    CookiesService,
    {
      provide: 'TOKEN',
      useValue: () => {
        console.log('custom provider');
      },
    },
  ],
  exports: [CookiesService],
})
export class CookiesModule {}
