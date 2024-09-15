import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction/transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ITransactionToken } from './interfaces/transaction.interface';
import { TransactionRepository } from './repos/transaction.repo';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionService , {provide:ITransactionToken , useClass:TransactionRepository}],
  exports:[TransactionService , {provide:ITransactionToken , useClass:TransactionRepository}]
})

export class TransactionModule {}
