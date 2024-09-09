import { DeleteResult } from "typeorm";
import { ServiceProviderDto } from "../dtos/serviceprovider.dto";
import { ServiceProvider } from "../entities/serviceprovider.entity";

export const IServiceProviderToken = Symbol("IServiceProviderRepository");
export interface IServiceProviderRepository {
    create(serviceProvider:ServiceProviderDto):Promise<ServiceProvider>

    delete(serviceProvider:ServiceProvider):Promise<DeleteResult>

    find():Promise<ServiceProvider[]>

    findOneById(id:number):Promise<ServiceProvider>
}