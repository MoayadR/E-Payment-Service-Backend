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

    async create(user: CreateUserDto): Promise<UserEntity> {
        const createdUser = this.userRepository.create(user);
        return await this.userRepository.save(createdUser);
    }

    async find(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async userExist(email: string): Promise<boolean>{
       const user = await this.userRepository.findOne({where:{'email':email}}); 
       
       if(user) return true;
       return false;
    }

}