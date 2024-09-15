import { Inject, Injectable } from '@nestjs/common';
import { RefundRequest } from 'src/refund-request/entities/refundrequest.entity';
import { IRefundRequest, IRefundRequestToken } from 'src/refund-request/interfaces/refundrequest.interface';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@Injectable()
export class RefundRequestService {
    constructor(
        @Inject(IRefundRequestToken) private readonly refundRequestRepository:IRefundRequest
    ){}

    create(transaction:Transaction , reason:string){
        return this.refundRequestRepository.create(transaction , reason);
    }

    find(){
        return this.refundRequestRepository.find();
    }

    delete(refundRequest:RefundRequest){
        return this.refundRequestRepository.delete(refundRequest);
    }

    findOneByTransaction(transaction:Transaction){
        return this.refundRequestRepository.findOneByTransaction(transaction);
    }
}
