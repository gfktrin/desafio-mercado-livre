import { Test, TestingModule } from '@nestjs/testing';
import { TorNodeController } from './tor-node.controller';

describe('TorNodeController', () => {
  let controller: TorNodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TorNodeController],
    }).compile();

    controller = module.get<TorNodeController>(TorNodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
