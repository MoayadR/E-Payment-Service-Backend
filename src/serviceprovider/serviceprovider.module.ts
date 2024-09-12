import { Module } from '@nestjs/common';
import { ServiceproviderController } from './controllers/serviceprovider/serviceprovider.controller';
import { ServiceProviderService } from './services/serviceprovider/serviceprovider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProvider } from './entities/serviceprovider.entity';
import { IServiceProviderToken } from './interfaces/serviceprovider.interface';
import { ServiceProviderRepository } from './repos/serviceprovider.repo';

@Module({
  imports:[TypeOrmModule.forFeature([ServiceProvider])],
  controllers: [ServiceproviderController],
  providers: [ServiceProviderService,
    {provide:IServiceProviderToken , useClass:ServiceProviderRepository},
  ],
  exports:[ServiceProviderService ,{provide:IServiceProviderToken , useClass:ServiceProviderRepository}, ]
})
export class ServiceproviderModule {}
