import { Inject, Injectable } from '@nestjs/common';
import { ServiceProviderDto } from 'src/serviceprovider/dtos/serviceprovider.dto';
import { ServiceProvider } from 'src/serviceprovider/entities/serviceprovider.entity';
import { IServiceProviderRepository, IServiceProviderToken } from 'src/serviceprovider/interfaces/serviceprovider.interface';

@Injectable()
export class ServiceproviderService {
    constructor(
        @Inject(IServiceProviderToken) private readonly serviceProviderRepo:IServiceProviderRepository
    ){}

    create(serviceProvider:ServiceProviderDto){
        return this.serviceProviderRepo.create(serviceProvider);
    }

    delete(serviceProvider:ServiceProvider){
        return this.serviceProviderRepo.delete(serviceProvider);
    }

    find(){
        return this.serviceProviderRepo.find();
    }

    findById(id:number){
        return this.serviceProviderRepo.findOneById(id);
    }
}
