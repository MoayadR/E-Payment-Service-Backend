import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ServiceProviderDto } from 'src/serviceprovider/dtos/serviceprovider.dto';
import { ServiceProviderService } from 'src/serviceprovider/services/serviceprovider/serviceprovider.service';
import { UserType } from 'src/user/entities/user.entity';

@Controller('serviceprovider')
export class ServiceproviderController {
    constructor(
        private readonly serviceProviderService:ServiceProviderService
    ){}

    @Post()
    @Roles(UserType.admin)
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    async createProvider(@Body() serviceProvider:ServiceProviderDto){
        return await this.serviceProviderService.create(serviceProvider);
    }

    @Delete(":id")
    @Roles(UserType.admin) 
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    async deleteProvider(@Param("id" , ParseIntPipe) id:number){
        const provider = await this.serviceProviderService.findById(id);

        return await this.serviceProviderService.delete(provider); 
    }

    @Get()
    @Roles(UserType.admin) 
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    async getProviders(){
        return await this.serviceProviderService.find();
    }
}
