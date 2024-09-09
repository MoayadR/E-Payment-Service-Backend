import { IsNotEmpty, IsString } from "class-validator";

export class ServiceProviderDto{
    @IsNotEmpty()
    @IsString()
    name:string
}