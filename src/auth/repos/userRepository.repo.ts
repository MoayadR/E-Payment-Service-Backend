import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/createUser.dto";
import { UserEntity } from "../entities/user.entity";
import { IUserRepository } from "../interfaces/user.interface";
import { InjectRepository } from "@nestjs/typeorm";

export class UserRepository implements IUserRepository{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:Repository<UserEntity>
    ){}

    create(user: CreateUserDto): Promise<UserEntity> {
        const createdUser = this.userRepository.create(user);
        return this.userRepository.save(createdUser);
    }

    find(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    userExist(email: string): boolean{
       const user = this.userRepository.findOne({where:{'email':email}}); 
       if(user) return true;
       return false;
    }

}