import { Module } from '@nestjs/common';
import { CreditcardService } from './services/creditcard/creditcard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from './entities/creditcard.entity';
import { ICreditCardToken } from './interfaces/credticard.interface';
import { CreditCardRepository } from './repos/creditcard.repo';
import { CreditcardController } from './controllers/creditcard/creditcard.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([CreditCard]) , UserModule],
  controllers: [CreditcardController],
  providers: [CreditcardService ,
    {provide:ICreditCardToken , useClass:CreditCardRepository},
    ],
    exports:[]
})
export class CreditcardModule {}
