import { IBarService } from '../bar/bar-service.interface';
import { AbstractBazService } from '../baz/abstract-baz.service';
export declare class FooService {
    private readonly barService;
    private readonly bazService;
    constructor(barService: IBarService, bazService: AbstractBazService);
    run(): void;
}
