import { Inject, Injectable } from '@nestjs/common';
import { CreditCardDto } from 'src/creditcard/dtos/creditcard.dto';
import { CreditCard } from 'src/creditcard/entities/creditcard.entity';
import { ICreditCardRepository, ICreditCardToken } from 'src/creditcard/interfaces/credticard.interface';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class CreditcardService {
    constructor(
        @Inject(ICreditCardToken) private readonly creditCardRepository:ICreditCardRepository
    ){}

    async createCreditCard(user: UserEntity, creditCard: CreditCardDto){
       return await this.creditCardRepository.create(user ,creditCard);
    }

    async deleteCreditCard(creditCard:CreditCard){
        return await this.creditCardRepository.delete(creditCard);
    }

    async updateCreditCard(creditCard:CreditCard){
        return await this.creditCardRepository.update(creditCard);
    }

    async findAllByUser(user:UserEntity){
        return await this.creditCardRepository.find(user);
    }

    async findOneById(id:number){
        return await this.creditCardRepository.findOneById(id);
    }

    belongs(creditCard:CreditCard , user:UserEntity){
        return creditCard.user.id === user.id;
    }

    async findAll(){
        return this.creditCardRepository.findAll();
    }
}
