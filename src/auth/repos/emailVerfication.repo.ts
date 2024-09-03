import { UserEntity } from "src/user/entities/user.entity";
import { DeleteResult, Repository } from "typeorm";
import { EmailVerification } from "../entities/emailVerfication.entity";
import { IEmailVerificationRepository } from "../interfaces/emailVerficationInterface";
import { InjectRepository } from "@nestjs/typeorm";
import { v4 as uuidv4 } from "uuid";

export class EmailVerficationRepository implements IEmailVerificationRepository{
    constructor(@InjectRepository(EmailVerification) private readonly emailVerficationRepository:Repository<EmailVerification>){}

    async create(user:UserEntity): Promise<EmailVerification> {
        const verficationToken = uuidv4();
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        const createdUser = this.emailVerficationRepository.create({verificationToken:verficationToken , expiryDate:expiryDate , user:user});
        return await this.emailVerficationRepository.save(createdUser);
    }

    async findOneByUser(user: UserEntity): Promise<EmailVerification> {
        return await this.emailVerficationRepository.findOne({where:{user:user}});
    }
    async findOneByToken(token: string): Promise<EmailVerification> {
        return await this.emailVerficationRepository.findOne({where:{verificationToken:token}});
    }
    async delete(emailVerfication: EmailVerification): Promise<DeleteResult> {
        return await this.emailVerficationRepository.delete(emailVerfication);
    }

}