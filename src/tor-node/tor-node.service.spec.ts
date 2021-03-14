import { Test, TestingModule } from '@nestjs/testing';
import { TorNodeService } from './tor-node.service';

describe('TorNodeService', () => {
  let service: TorNodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TorNodeService],
    }).compile();

    service = module.get<TorNodeService>(TorNodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
