import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Req, UnauthorizedException, UseGuards, } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreditcardService } from 'src/creditcard/services/creditcard/creditcard.service';
import { PaymentDto } from 'src/service/dtos/payment.dto';
import { CreateServiceDto } from 'src/service/dtos/service.dto';
import { ValidatorFactory } from 'src/service/factories/validator.factory';
import { ServiceService } from 'src/service/services/service/service.service';
import { ServiceProviderService } from 'src/serviceprovider/services/serviceprovider/serviceprovider.service';
import { TransactionService } from 'src/transaction/services/transaction/transaction.service';
import { UserEntity, UserType } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user/user.service';

@Controller('services')
export class ServiceController {
    constructor(
        private readonly serviceService:ServiceService,
        private readonly serviceProviderService:ServiceProviderService,
        private readonly userService:UserService,
        private readonly creditCardService:CreditcardService,
        private readonly transactionService:TransactionService,
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
    @UseGuards(JwtGuard)
    async getServiceByCode(@Param("code") code:string){
        return await this.serviceService.findOneByCode(code);
    }

    @Post('pay/:id?')
    @UseGuards(JwtGuard)
    async pay(@Param("id" , ParseIntPipe) id:number ,@Body() paymentDto:PaymentDto , @Query('wallet') wallet:boolean ,@Query('creditcard') creditID:number ,  @Req() req:Request){
        const userReq = req.user as UserEntity;
        const user = await this.userService.getUserByID(userReq.id);

        const service = await this.serviceService.findOneById(id);
        const validator = ValidatorFactory.validatorFactory(service.serviceType);  

        if (!validator.isValid(paymentDto))
            throw new BadRequestException("The Body Data is Invalid");

         
        if (wallet === true)
        {
            console.log(wallet);
            const status = this.serviceService.payWithWallet(user , paymentDto.amount);
            if(!status) throw new BadRequestException("Insufficent Wallet Balance!");

            await this.userService.updateUser(user);

            const transaction = await this.transactionService.create(service , user , paymentDto.amount);
            delete transaction.user;
            return transaction;
        }
        
        const creditCard = await this.creditCardService.findOneById(creditID);

        if (!this.creditCardService.belongs(creditCard , user)) throw new UnauthorizedException();

        const status = this.serviceService.payWithCreditCard(creditCard , paymentDto.amount);
        if(!status) throw new BadRequestException("Insufficent Wallet Balance!");

        await this.creditCardService.updateCreditCard(creditCard);

        const transaction = await this.transactionService.create(service , user , paymentDto.amount);
        delete transaction.user;
        return transaction;
    }
}
