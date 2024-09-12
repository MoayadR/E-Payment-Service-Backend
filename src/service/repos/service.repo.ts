import { DeleteResult, Repository } from "typeorm";
import { Service } from "../entities/service.entity";
import { IServiceRepository } from "../interfaces/service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateServiceDto } from "../dtos/service.dto";
import { ServiceProvider } from "src/serviceprovider/entities/serviceprovider.entity";

export class ServiceRepository implements IServiceRepository{
    constructor(
        @InjectRepository(Service) private readonly serviceRepo:Repository<Service>
    ){}

    create(payload:CreateServiceDto , serviceProvider:ServiceProvider): Promise<Service> {
        const service = this.serviceRepo.create(payload);
        service.serviceProvider = serviceProvider;

        return this.serviceRepo.save(service);
    }

    delete(service: Service): Promise<DeleteResult> {
        return this.serviceRepo.delete(service);
    }

    findOneById(id: number): Promise<Service> {
        return this.serviceRepo.findOne({where:{id:id}});
    }

    findOneByCode(code: string): Promise<Service> {
        return this.serviceRepo.findOne({where:{code:code}});
    }

    find(): Promise<Service[]> {
        return this.serviceRepo.find();
    }
}