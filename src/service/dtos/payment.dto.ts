import { IsNotEmpty, IsNumber, } from "class-validator"

export class PaymentDto{

    @IsNotEmpty()
    @IsNumber()
    amount:number

    mobileNumber?:string

    landlineNumber?:string
}