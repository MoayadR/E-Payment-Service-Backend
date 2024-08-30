import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/createUser.dto';
import { UserEntity } from 'src/auth/entities/user.entity';
import { IUserRepository, IUserRepositoryToken } from 'src/auth/interfaces/user.interface';

@Injectable()
export class UserService {

    constructor(
        @Inject(IUserRepositoryToken)
        private userRepository:IUserRepository
    ){}

    
    createUser(user:CreateUserDto):Promise<UserEntity>{
        if (this.userRepository.userExist(user.email))
            throw new HttpException("User Email Already Exists!", HttpStatus.BAD_REQUEST )
        return this.userRepository.create(user);
    }

    getUsers():Promise<UserEntity[]>{
        return  this.userRepository.find();
    }
}
