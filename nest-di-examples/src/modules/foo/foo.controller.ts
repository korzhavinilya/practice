import { Controller, Get } from '@nestjs/common';
import { FooService } from './foo.service';

@Controller()
export class FooController {
  constructor(private readonly fooService: FooService) {}

  @Get()
  run() {
    return this.fooService.run();
  }
}
