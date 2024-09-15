import { Test, TestingModule } from '@nestjs/testing';
import { RefundrequestController } from './refundrequest.controller';

describe('RefundrequestController', () => {
  let controller: RefundrequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefundrequestController],
    }).compile();

    controller = module.get<RefundrequestController>(RefundrequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
