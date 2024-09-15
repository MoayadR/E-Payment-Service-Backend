import { Module } from '@nestjs/common';
import { ServiceController } from './controllers/service/service.controller';
import { ServiceService } from './services/service/service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { IServiceToken } from './interfaces/service.interface';
import { ServiceRepository } from './repos/service.repo';
import { ServiceproviderModule } from 'src/serviceprovider/serviceprovider.module';
import { UserModule } from 'src/user/user.module';
import { CreditcardModule } from 'src/creditcard/creditcard.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  controllers: [ServiceController],
  providers: [
    ServiceService,
    {provide:IServiceToken , useClass:ServiceRepository},
  ],
  imports:[
    TypeOrmModule.forFeature([Service]),
    ServiceproviderModule,
    UserModule,
    CreditcardModule,
    TransactionModule,
],
})
export class ServiceModule {}
