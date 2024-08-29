import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository:Repository<UserEntity>
    ){}

    createUser(userData:any):Promise<UserEntity[]>{
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    getUsers():Promise<UserEntity[]>{
        return  this.userRepository.find();
    }
}
