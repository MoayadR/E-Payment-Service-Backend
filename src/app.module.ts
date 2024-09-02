import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type:"sqlite",
    database:`${__dirname}/../database/e-payment.db`,
    entities:[UserEntity],
    synchronize:true,
  }), AuthModule],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
