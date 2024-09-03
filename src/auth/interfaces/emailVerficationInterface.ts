import { UserEntity } from "src/user/entities/user.entity";
import { EmailVerification } from "../entities/emailVerfication.entity";
import { DeleteResult } from "typeorm";

export const IEmailVerificationToken = Symbol("IEmailVerification");

export interface IEmailVerificationRepository{
    create(user:UserEntity):Promise<EmailVerification>

    findOneByUser(user:UserEntity):Promise<EmailVerification>
    findOneByToken(token:string):Promise<EmailVerification>

    delete(emailVerfication:EmailVerification):Promise<DeleteResult>
}