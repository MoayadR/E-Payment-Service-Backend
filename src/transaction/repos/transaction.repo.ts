import { Service } from "src/service/entities/service.entity";
import { UserEntity } from "src/user/entities/user.entity";
import {  DeleteResult, Repository } from "typeorm";
import { ITransactionRepo } from "../interfaces/transaction.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "../entities/transaction.entity";

export class TransactionRepository implements ITransactionRepo{
    constructor(
        @InjectRepository(Transaction) private readonly transactionRepo:Repository<Transaction>
    ){}

    findOneById(id: number): Promise<Transaction> {
        return this.transactionRepo.findOne({where:{id:id}});
    }

    update(transaction: any): Promise<Transaction> {
        return this.transactionRepo.save(transaction);
    }

    create(paymentService: Service, user: UserEntity , price:number): Promise<Transaction> {
        const transaction = this.transactionRepo.create();

        transaction.price = price;
        transaction.service = paymentService;
        transaction.user = user;

        return this.transactionRepo.save(transaction);
    }

    delete(transaction: Transaction): Promise<DeleteResult> {
        return this.transactionRepo.delete(transaction);
    }

    findAllByUser(user: UserEntity): Promise<Transaction[]> {
        return this.transactionRepo.find({where: {user:user},relations:['service']});
    }

}