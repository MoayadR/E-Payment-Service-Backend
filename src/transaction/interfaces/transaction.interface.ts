import { Service } from "src/service/entities/service.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { DeleteResult } from "typeorm";
import { Transaction } from "../entities/transaction.entity";

export const ITransactionToken = Symbol("ITransactionToken");

export interface ITransactionRepo{

    create(paymentService:Service , user:UserEntity , price:number ):Promise<Transaction>;

    delete(transaction:Transaction):Promise<DeleteResult>;

    findAllByUser(user:UserEntity):Promise<Transaction[]>

    findOneById(id:number):Promise<Transaction>

    update(transaction):Promise<Transaction>
}