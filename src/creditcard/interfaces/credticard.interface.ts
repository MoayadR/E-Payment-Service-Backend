import { UserEntity } from "src/user/entities/user.entity";
import { CreditCard } from "../entities/creditcard.entity";
import { CreditCardDto } from "../dtos/creditcard.dto";
import { DeleteResult } from "typeorm";

export const ICreditCardToken = Symbol("ICreditCardRepository")
export interface ICreditCardRepository{
    create(user:UserEntity , creditCard:CreditCardDto):Promise<CreditCard>

    delete(creditCard:CreditCard):Promise<DeleteResult>

    update(creditCard:CreditCard):Promise<CreditCard>

    findAll():Promise<CreditCard[]>
    find(user:UserEntity):Promise<CreditCard[]>
    findOneById(id:number):Promise<CreditCard>
}