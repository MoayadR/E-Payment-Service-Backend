import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/createUser.dto';
import { UserEntity } from 'src/auth/entities/user.entity';
import { IUserRepository, IUserRepositoryToken } from 'src/auth/interfaces/user.interface';
import { hashPassword } from 'src/auth/utils/bcrypt';

@Injectable()
export class UserService {

    constructor(
        @Inject(IUserRepositoryToken)
        private userRepository:IUserRepository
    ){}

    
    async createUser(user:CreateUserDto):Promise<UserEntity>{
        if (await this.userRepository.userExist(user.email))
            throw new HttpException("User Email Already Exists!", HttpStatus.BAD_REQUEST )

        const password = hashPassword(user.password);
        return this.userRepository.create({...user ,password });
    }

    getUsers():Promise<UserEntity[]>{
        return  this.userRepository.find();
    }
}
