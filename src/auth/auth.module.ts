import { Module } from '@nestjs/common';
import { UserController as UserController } from './controllers/users.controller';
import { UserService } from './services/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class AuthModule {}
