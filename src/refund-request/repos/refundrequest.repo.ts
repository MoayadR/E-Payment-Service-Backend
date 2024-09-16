import { Transaction } from "src/transaction/entities/transaction.entity";
import { DeleteResult, Repository } from "typeorm";
import { RefundRequest } from "../entities/refundrequest.entity";
import { IRefundRequest } from "../interfaces/refundrequest.interface";
import { InjectRepository } from "@nestjs/typeorm";

export class RefundRequestRepo implements IRefundRequest{
    constructor(
        @InjectRepository(RefundRequest) private readonly refundRequestRepo:Repository<RefundRequest>
    ){}

    findOneById(id: number): Promise<RefundRequest> {
        return this.refundRequestRepo.findOne({where:{id:id} , relations:['transaction']});
    }

    findOneByTransaction(transaction: Transaction): Promise<RefundRequest> {
        return this.refundRequestRepo.findOne({where:{transaction:transaction}});
    }

    create(transaction: Transaction , reason:string): Promise<RefundRequest> {
        const refund = this.refundRequestRepo.create();
        refund.transaction = transaction;
        refund.reason = reason;
        return this.refundRequestRepo.save(refund);
    }

    delete(refundRequest: RefundRequest): Promise<DeleteResult> {
        return this.refundRequestRepo.delete(refundRequest);
    }

    find(): Promise<RefundRequest[]> {
        return this.refundRequestRepo.find({relations:['transaction']});
    }

}