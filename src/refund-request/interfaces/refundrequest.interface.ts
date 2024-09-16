import { Transaction } from "src/transaction/entities/transaction.entity";
import { RefundRequest } from "../entities/refundrequest.entity";
import { DeleteResult } from "typeorm";

export const IRefundRequestToken = Symbol("IRefundRequest");

export interface IRefundRequest{

    create(transaction:Transaction , reason:string):Promise<RefundRequest>;

    delete(refundRequest:RefundRequest):Promise<DeleteResult>

    find():Promise<RefundRequest[]>
    findOneById(id:number):Promise<RefundRequest>

    findOneByTransaction(transaction:Transaction):Promise<RefundRequest>

}