import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { IEmailVerificationToken } from './interfaces/emailVerficationInterface';
import { EmailVerficationRepository } from './repos/emailVerfication.repo';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerification } from './entities/emailVerfication.entity';

@Module({
  providers: [
    EmailService ,
     {provide:IEmailVerificationToken,
       useClass:EmailVerficationRepository},
      ],
  imports:[MailerModule, ConfigModule , TypeOrmModule.forFeature([EmailVerification])],
  exports:[EmailService]
})
export class EmailModule {}
