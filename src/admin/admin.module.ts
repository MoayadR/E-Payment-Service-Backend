import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin/admin.controller';
import { RefundRequestModule } from 'src/refund-request/refund-request.module';
import { UserModule } from 'src/user/user.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports:[RefundRequestModule , UserModule , TransactionModule],
  controllers: [AdminController]
})
export class AdminModule {}
