import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { RefreshToken } from './auth/entities/refreshToken.entity';
import { EmailVerification } from './email/entities/emailVerfication.entity';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
import { CreditcardModule } from './creditcard/creditcard.module';
import { CreditCard } from './creditcard/entities/creditcard.entity';
import { ServiceproviderModule } from './serviceprovider/serviceprovider.module';
import { ServiceProvider } from './serviceprovider/entities/serviceprovider.entity';
import { ServiceModule } from './service/service.module';
import { Service } from './service/entities/service.entity';

@Module({
  imports: [
    MailerModule,
    ConfigModule.forRoot()
    ,UserModule
    ,TypeOrmModule.forRoot({
    type:"sqlite",
    database:`${__dirname}/../database/e-payment.db`,
    entities:[UserEntity, RefreshToken , EmailVerification , CreditCard , ServiceProvider , Service],
    synchronize:true,
  }), 
  AuthModule, EmailModule, CreditcardModule, ServiceproviderModule, ServiceModule
],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
