import { UserEntity } from "src/user/entities/user.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreditCardDto } from "../dtos/creditcard.dto";
import { CreditCard } from "../entities/creditcard.entity";
import { ICreditCardRepository } from "../interfaces/credticard.interface";
import { InjectRepository } from "@nestjs/typeorm";

export class CreditCardRepository implements ICreditCardRepository{
    constructor(
        @InjectRepository(CreditCard) private readonly creditCardRepo:Repository<CreditCard>
    ){}

    async create(user: UserEntity, creditCard: CreditCardDto): Promise<CreditCard> {
        const creditCardObj = this.creditCardRepo.create(creditCard);
        creditCardObj.user = user;
        return await this.creditCardRepo.save(creditCardObj);
    }

    async delete(creditCard: CreditCard): Promise<DeleteResult> {
        return await this.creditCardRepo.delete(creditCard);
    }

    async update(creditCard: CreditCard): Promise<CreditCard> {
        return await this.creditCardRepo.save(creditCard);
    }

    async find(user: UserEntity) {
        return await this.creditCardRepo.find({where:{user:user}});
    }

    async findOneById(id: number) {
        return await this.creditCardRepo.findOne({where:{id:id} , relations:['user']});
    }

}