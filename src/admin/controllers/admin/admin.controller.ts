import { BadRequestException, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RefundRequestService } from 'src/refund-request/services/refundrequest/refundrequest.service';
import { TransactionType } from 'src/transaction/entities/transaction.entity';
import { TransactionService } from 'src/transaction/services/transaction/transaction.service';
import { UserType } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user/user.service';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly refundRequestService:RefundRequestService,
        private readonly transactionService:TransactionService,
        private readonly userService:UserService
    ){}

    @Post('accept/:id')
    @Roles(UserType.admin)
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    async acceptRefund(@Param('id',ParseIntPipe) id:number){
        const refund = await this.refundRequestService.findOneById(id); 

        if(!refund) throw new BadRequestException("There exist no refund request with such ID");

        const transaction = await this.transactionService.findOneById(refund.transaction.id);
        if(!transaction) throw new BadRequestException("No Such Transaction!");

        const {user} = transaction;
        user.walletBalance += transaction.price;

        await this.refundRequestService.delete(refund);
        await this.transactionService.delete(transaction);
        
        const refundTransaction = await this.transactionService.create(transaction.service , user , transaction.price , TransactionType.refund);

        await this.userService.updateUser(user);

        return refundTransaction;
    }

    @Post('reject/:id')
    @Roles(UserType.admin)
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    async rejectRefund(@Param('id',ParseIntPipe) id:number){
        const refund = await this.refundRequestService.findOneById(id); 

        if(!refund) throw new BadRequestException("There exist no refund request with such ID");

        return await this.refundRequestService.delete(refund);
    }
}
