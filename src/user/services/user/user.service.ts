import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { IUserRepository, IUserRepositoryToken } from 'src/user/interfaces/user.interface';
import { hashPassword } from 'src/user/utils/bcrypt';

@Injectable()
export class UserService {

    constructor(
        @Inject(IUserRepositoryToken)
        private userRepository:IUserRepository
    ){}

    
    async createUser(user:RegisterUserDto):Promise<UserEntity>{
        if (await this.userRepository.userExist(user.email))
            throw new HttpException("User Email Already Exists!", HttpStatus.BAD_REQUEST )

        const password = hashPassword(user.password);
        return this.userRepository.create({...user ,password });
    }

    getUsers():Promise<UserEntity[]>{
        return  this.userRepository.find();
    }
}
