import { Module } from '@nestjs/common';
import { RefundrequestController } from './controllers/refundrequest/refundrequest.controller';
import { RefundRequestService } from './services/refundrequest/refundrequest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefundRequest } from './entities/refundrequest.entity';
import { IRefundRequestToken } from './interfaces/refundrequest.interface';
import { RefundRequestRepo } from './repos/refundrequest.repo';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports:[TypeOrmModule.forFeature([RefundRequest]) , TransactionModule],
  controllers: [RefundrequestController],
  providers: [RefundRequestService , {provide:IRefundRequestToken , useClass:RefundRequestRepo}],
  exports:[RefundRequestService , {provide:IRefundRequestToken , useClass:RefundRequestRepo}]
})
export class RefundRequestModule {}
