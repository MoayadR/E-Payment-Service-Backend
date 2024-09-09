import { DeleteResult, Repository } from "typeorm";
import { ServiceProviderDto } from "../dtos/serviceprovider.dto";
import { ServiceProvider } from "../entities/serviceprovider.entity";
import { IServiceProviderRepository } from "../interfaces/serviceprovider.interface";
import { InjectRepository } from "@nestjs/typeorm";

export class ServiceProviderRepository implements IServiceProviderRepository{
    constructor(
        @InjectRepository(ServiceProvider) private readonly serviceProviderRepository:Repository<ServiceProvider>
    ){}

    findOneById(id: number): Promise<ServiceProvider> {
        return this.serviceProviderRepository.findOne({where:{id:id}});
    }

    find(): Promise<ServiceProvider[]> {
        return this.serviceProviderRepository.find();
    }

    create(serviceProvider: ServiceProviderDto): Promise<ServiceProvider> {
        const provider = this.serviceProviderRepository.create(serviceProvider);
        return this.serviceProviderRepository.save(provider);
    }

    delete(serviceProvider: ServiceProvider): Promise<DeleteResult> {
        return this.serviceProviderRepository.delete(serviceProvider);
    }

}