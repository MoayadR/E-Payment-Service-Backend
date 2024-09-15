import { BadRequestException, Body, Controller, Get, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RefundDto } from 'src/refund-request/dtos/refund.dto';
import { RefundRequestService as RefundRequestService } from 'src/refund-request/services/refundrequest/refundrequest.service';
import { TransactionType } from 'src/transaction/entities/transaction.entity';
import { TransactionService } from 'src/transaction/services/transaction/transaction.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('refundrequests')
export class RefundrequestController {
    constructor(
        private readonly refundRequestService:RefundRequestService,
        private readonly transactionService:TransactionService
    ){}

    @Get('')
    @UseGuards(JwtGuard)
    async getAllRefundRequests(){
        return await this.refundRequestService.find();
    }
    
    @Post(':id') 
    @UseGuards(JwtGuard)
    async createRefundRequest(@Body() refundDto:RefundDto ,@Param('id') transactionID,  @Req() req:Request){
        
        const userReq = req.user as UserEntity;

        // check if the user is === to the transaction user
        const transaction = await this.transactionService.findOneById(transactionID);

        if(!transaction) throw new BadRequestException("There is no Such Transaction ID");

        // if transaction is a refund don't refund it
        if (transaction.transactionType === TransactionType.refund) throw new BadRequestException("The Transaction Type is Already a Refund!");

        if (userReq.id !== transaction.user.id) throw new UnauthorizedException("You are not the user that did that transaction!");

        // check if the exist no refund request for the transaction
        const refund = await this.refundRequestService.findOneByTransaction(transaction);
        if (refund) throw new BadRequestException("The Refund Was Already Requested for this Transaction");

        // create the refund request
        const refundRequest = await this.refundRequestService.create(transaction , refundDto.reason);

        delete refundRequest.transaction.user

        return refundRequest;
    }
}
