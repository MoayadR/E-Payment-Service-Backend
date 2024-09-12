import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator"
import { ServiceType } from "../entities/service.entity"

export class CreateServiceDto{
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsNumberString()
    code:string

    @IsNotEmpty()
    @IsEnum(ServiceType)
    serviceType:ServiceType

    @IsNotEmpty()
    @IsNumber()
    providerID:number
}