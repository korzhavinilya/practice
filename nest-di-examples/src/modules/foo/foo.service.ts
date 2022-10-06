import { Inject, Injectable } from '@nestjs/common';
import { IBarService } from '../bar/bar-service.interface';
import { AbstractBazService } from '../baz/abstract-baz.service';

@Injectable()
export class FooService {
  constructor(
    @Inject('BAR_SERVICE') private readonly barService: IBarService,
    private readonly bazService: AbstractBazService,
  ) {}

  run() {
    console.log('barService', this.barService.run());
    console.log('bazService', this.bazService.run());
  }
}
