import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction/transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ITransactionToken } from './interfaces/transaction.interface';
import { TransactionRepository } from './repos/transaction.repo';
import { Transaction } from './entities/transaction.entity';
import { TransactionController } from './controllers/transaction/transaction.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Transaction]) , UserModule],
  providers: [TransactionService , {provide:ITransactionToken , useClass:TransactionRepository}],
  exports:[TransactionService , {provide:ITransactionToken , useClass:TransactionRepository}],
  controllers: [TransactionController]
})

export class TransactionModule {}
