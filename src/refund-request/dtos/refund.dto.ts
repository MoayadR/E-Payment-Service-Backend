import { IsNotEmpty, IsString } from "class-validator";

export class RefundDto{
    @IsNotEmpty()
    @IsString()
    reason:string 
}