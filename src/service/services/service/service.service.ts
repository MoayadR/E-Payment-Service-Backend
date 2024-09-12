import { Inject, Injectable } from '@nestjs/common';
import { CreditCard } from 'src/creditcard/entities/creditcard.entity';
import { CreateServiceDto } from 'src/service/dtos/service.dto';
import { Service } from 'src/service/entities/service.entity';
import { IServiceRepository, IServiceToken } from 'src/service/interfaces/service.interface';
import { ServiceProvider } from 'src/serviceprovider/entities/serviceprovider.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class ServiceService {
    constructor(
        @Inject(IServiceToken) private readonly serviceRepository:IServiceRepository
    ){}

    async create(payload:CreateServiceDto , serviceProvider:ServiceProvider){
        return await this.serviceRepository.create(payload , serviceProvider);
    }

    async delete(service:Service){
        return await this.serviceRepository.delete(service);
    }

    async find(){
        return await this.serviceRepository.find();
    }

    async findOneById(id:number){
        return await this.serviceRepository.findOneById(id);
    }

    async findOneByCode(code:string){
        return await this.serviceRepository.findOneByCode(code);
    }

    payWithWallet(user:UserEntity , amount:number ):boolean{
        if (amount <0) return false;
        if (user.walletBalance < amount) return false;

        user.walletBalance -= amount;
        return true;
    }

    payWithCreditCard(creditCard:CreditCard , amount:number):boolean{
        if (amount <0) return false;
        if(creditCard.balance < amount) return false;

        creditCard.balance -= amount;
        return true;
    }
}
