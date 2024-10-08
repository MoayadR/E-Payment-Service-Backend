import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UnauthorizedException, UseGuards, } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreditCardDto } from 'src/creditcard/dtos/creditcard.dto';
import { CreditcardService } from 'src/creditcard/services/creditcard/creditcard.service';
import { UserEntity, UserType} from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user/user.service';

@Controller('creditcards')
export class CreditcardController {
    constructor(
        private readonly creditCardService:CreditcardService,
        private readonly userService:UserService,
    ){}

    @Get('')
    @Roles(UserType.admin)
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    async getCreditCards(){
        return await this.creditCardService.findAll();
    }

    @Get('user')
    @UseGuards(JwtGuard)
    async getCreditCardForUser(@Req() req:Request){
        const userReq:UserEntity = req.user as UserEntity;
        const user = await this.userService.getUserByID(userReq.id);
        const cards = await this.creditCardService.findAllByUser(user);

        return cards;
    }

    @Post('')
    @UseGuards(JwtGuard)
    async addCreditCard(@Req() req:Request ,@Body() creditCardDto:CreditCardDto){
        const userReq:UserEntity = req.user as UserEntity;
        const user = await this.userService.getUserByID(userReq.id);

        const cards = await this.creditCardService.findAllByUser(user);
        
        if (cards.some((card)=>card.cardNumber === creditCardDto.cardNumber))
            throw new BadRequestException("The Card Number is already registerd on for this User");

        return await this.creditCardService.createCreditCard(user , creditCardDto);
    }

    @Put('charge/:id')
    @UseGuards(JwtGuard)
    async chargeCreditCard(@Req() req:Request ,@Param("id" , ParseIntPipe) id:number, @Body() chargeDto){
        if (chargeDto.amount < 0)
            throw new BadRequestException();

        const userReq:UserEntity = req.user as UserEntity;
        const user = await this.userService.getUserByID(userReq.id);
        const card = await this.creditCardService.findOneById(id);

        if(!this.creditCardService.belongs(card , user))
            throw new UnauthorizedException();

        card.balance += chargeDto.amount;
        
        return await this.creditCardService.updateCreditCard(card);
    }

    @Delete('delete/:id')
    @UseGuards(JwtGuard)
    async deleteCreditCard(@Req() req:Request , @Param("id" , ParseIntPipe) id:number){
        const userReq:UserEntity = req.user as UserEntity;
        const user = await this.userService.getUserByID(userReq.id);
        const card = await this.creditCardService.findOneById(id);

        if(!this.creditCardService.belongs(card , user))
            throw new UnauthorizedException();

        return await this.creditCardService.deleteCreditCard(card);
    }
}
