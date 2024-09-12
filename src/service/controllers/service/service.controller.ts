import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateServiceDto } from 'src/service/dtos/service.dto';
import { ServiceService } from 'src/service/services/service/service.service';
import { ServiceProviderService } from 'src/serviceprovider/services/serviceprovider/serviceprovider.service';
import { UserType } from 'src/user/entities/user.entity';

@Controller('service')
export class ServiceController {
    constructor(
        private readonly serviceService:ServiceService,
        private readonly serviceProviderService:ServiceProviderService,
    ){}

    @Post('')
    @Roles(UserType.admin)
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    async create(@Body() payload:CreateServiceDto){
        const {providerID} = payload;
        const serviceProvider = await this.serviceProviderService.findById(providerID);
        
        return await this.serviceService.create(payload , serviceProvider);
    }

    @Get('')
    @Roles(UserType.admin)
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    async getServices(){
        return await this.serviceService.find();
    }

    @Delete(':id')
    @Roles(UserType.admin)
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    async deleteService(@Param("id" , ParseIntPipe) id:number){
        const service = await this.serviceService.findOneById(id);
        return await this.serviceService.delete(service);
    }

    @Get(':code')
    @Roles(UserType.admin)
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    async getServiceByCode(@Param("code") code:string){
        return await this.serviceService.findOneByCode(code);
    }
}
