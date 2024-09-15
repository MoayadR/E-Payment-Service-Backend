import { Inject, Injectable } from '@nestjs/common';
import { Service } from 'src/service/entities/service.entity';
import { Transaction, TransactionType } from 'src/transaction/entities/transaction.entity';
import { ITransactionRepo, ITransactionToken } from 'src/transaction/interfaces/transaction.interface';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class TransactionService {
    constructor(
        @Inject(ITransactionToken) private readonly transactionRepository:ITransactionRepo
    ){}

    create(paymentService:Service , user:UserEntity , price:number , transactionType:TransactionType){
        return this.transactionRepository.create(paymentService , user , price , transactionType);
    }

    delete(transaction:Transaction){
        return this.transactionRepository.delete(transaction);
    }

    update(transaction:Transaction){
        return this.transactionRepository.update(transaction);
    }


    findAllByUser(user:UserEntity){
        return this.transactionRepository.findAllByUser(user);
    }

    findOneById(id:number){
        return this.transactionRepository.findOneById(id);
    }
}
