import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator"

export class CreditCardDto{
    @IsNotEmpty()
    @IsNumber()
    balance:number

    @IsNotEmpty()
    @IsString()
    @Matches("^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$")
    cardNumber:string
    
    @IsNotEmpty()
    @IsString()
    @Matches("[a-zA-Z]+ [a-zA-Z]+ ?[a-zA-Z]+?")
    nameOnCard:string

    @IsNotEmpty()
    @IsString()
    @Matches("[0-9]{2}/[0-9]{2}")
    expiryDate:string

    @IsNotEmpty()
    @IsString()
    @Matches("[0-9]{3,4}")
    cvv:string
}