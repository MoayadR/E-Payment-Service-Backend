import { DeleteResult } from "typeorm"
import { Service } from "../entities/service.entity"
import { CreateServiceDto } from "../dtos/service.dto"
import { ServiceProvider } from "src/serviceprovider/entities/serviceprovider.entity"

export const IServiceToken = Symbol("IServiceRepository")
export interface IServiceRepository{
    create(payload:CreateServiceDto , serviceProvider:ServiceProvider):Promise<Service>

    delete(service:Service):Promise<DeleteResult>

    findOneById(id:number):Promise<Service>
    findOneByCode(code:string):Promise<Service>
    find():Promise<Service[]>
}