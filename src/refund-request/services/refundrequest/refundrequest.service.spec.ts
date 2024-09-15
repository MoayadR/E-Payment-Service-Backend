import { Test, TestingModule } from '@nestjs/testing';
import { RefundRequestService } from './refundrequest.service';

describe('RefundrequestService', () => {
  let service: RefundRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefundRequestService],
    }).compile();

    service = module.get<RefundRequestService>(RefundRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
