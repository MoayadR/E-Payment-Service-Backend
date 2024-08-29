import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './auth/entities/user.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({
    type:"sqlite",
    database:`${__dirname}/../database/e-payment.db`,
    entities:[UserEntity],
    synchronize:true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
