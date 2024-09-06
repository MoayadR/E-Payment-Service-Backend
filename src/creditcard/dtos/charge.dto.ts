import { IsNotEmpty, IsNumber, } from "class-validator";

export class ChargeDto{
    @IsNotEmpty()
    @IsNumber()
    amount:number
}