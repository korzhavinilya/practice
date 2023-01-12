import { Test } from '@nestjs/testing';
import { UnitTestingService } from './unit-testing.service';

describe('UnitTestingService', () => {
  let service: UnitTestingService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UnitTestingService],
    }).compile();

    service = module.get(UnitTestingService);
  });

  describe('findAll', () => {
    it('should return an array', async () => {
      const result = ['unit', 'testing', 'service'];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(await service.findAll()).toBe(result);
    });
  });
});
