import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { IUserRepository, IUserRepositoryToken } from 'src/user/interfaces/user.interface';

@Injectable()
export class UserService {

    constructor(
        @Inject(IUserRepositoryToken)
        private userRepository:IUserRepository
    ){}

    async userExistEmail(email:string):Promise<boolean>{
        return await this.userRepository.userExistEmail(email);
    }
    async userExistUsername(username:string):Promise<boolean>{
        return await this.userRepository.userExistUsername(username);
    }

    async getUserByUsername(username:string){
        return await this.userRepository.findOneUsername(username);
    }

    async getUserByID(id:number){
        return await this.userRepository.findOneID(id);
    }
    
    async createUser(user:RegisterUserDto):Promise<UserEntity>{
        return this.userRepository.createUser(user);
    }

    getUsers():Promise<UserEntity[]>{
        return  this.userRepository.find();
    }

    async updateUser(user:UserEntity){
        await this.userRepository.update(user);
    }
}
