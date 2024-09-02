import { Module } from '@nestjs/common';
import { UserController as UserController } from './controllers/users.controller';
import { UserService } from './services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { IUserRepositoryToken } from './interfaces/user.interface';
import { UserRepository } from './repos/userRepository.repo';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService,
    {
      provide:IUserRepositoryToken,
      useClass:UserRepository
    }
  ],
  exports:[UserService]
})
export class UserModule {}
