import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { generateEmailHTML, verifyEndpoint } from 'src/email/constants/mail.constants';
import { IEmailVerificationRepository, IEmailVerificationToken } from '../interfaces/emailVerficationInterface';
import { UserEntity } from 'src/user/entities/user.entity';
import { EmailVerification } from '../entities/emailVerfication.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    constructor(
        private readonly configService:ConfigService,
        @Inject(IEmailVerificationToken) private emailVerificationRepo:IEmailVerificationRepository,
    ){}

    async createEmailVerification(user:UserEntity){
        return await this.emailVerificationRepo.create(user);
    }

    async getEmailVerificationWithToken(verificationToken:string){
        return await this.emailVerificationRepo.findOneByToken(verificationToken);
    }

    async deleteEmailVerification(emailVerification:EmailVerification){
        return this.emailVerificationRepo.delete(emailVerification);
    }

    createTransport(){
        const transport = nodemailer.createTransport({
        host: this.configService.get<string>('MAIL_HOST'),
        port: this.configService.get<number>('MAIL_PORT'),
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: this.configService.get<string>('MAIL_USER'),
          pass: this.configService.get<string>('MAIL_PASSWORD'),
        },
      })

      return transport;
    }

    async sendVerficationEmail(email:string , verficationToken:string){
        const verficationLink = `${verifyEndpoint}/${verficationToken}`;
        const transport = this.createTransport();

        const options: Mail.Options = {
            from:this.configService.get<string>('MAIL_USER'),
            to: email,
            subject:"Verification Email",
            html:generateEmailHTML(verficationLink)
        };
        const result = await transport.sendMail(options);

        return result;
    }
}
