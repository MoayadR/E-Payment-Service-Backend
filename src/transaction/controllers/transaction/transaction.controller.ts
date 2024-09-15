import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { TransactionService } from 'src/transaction/services/transaction/transaction.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user/user.service';

@Controller('transactions')
export class TransactionController {
   constructor(
    private readonly transactionService:TransactionService,
    private readonly userService:UserService
   ){} 

   @Get('')
   @UseGuards(JwtGuard)
   async getTransactions(@Req() req:Request){
        const userReq = req.user as UserEntity;
        const user = await this.userService.getUserByID(userReq.id);

        return this.transactionService.findAllByUser(user);
   }

}
