import { Test } from '@nestjs/testing';
import { UnitTestingController } from './unit-testing.controller';
import { UnitTestingService } from './unit-testing.service';

describe('UnitTestingController', () => {
  let controller: UnitTestingController;
  let service: UnitTestingService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UnitTestingController],
      providers: [UnitTestingService],
    }).compile();

    controller = module.get(UnitTestingController);
    service = module.get(UnitTestingService);
  });

  describe('findAll', () => {
    it('should return an array', async () => {
      const result = ['unit', 'testing', 'service'];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll()).toBe(result);
    });
  });
});
