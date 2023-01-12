import { UnitTestingService } from './unit-testing.service';
export declare class UnitTestingController {
    private readonly unitTestingService;
    constructor(unitTestingService: UnitTestingService);
    findAll(): string[];
}
