import { Repository } from "typeorm";
import { RegisterUserDto } from "../../auth/dto/registerUser.dto";
import { UserEntity } from "../entities/user.entity";
import { IUserRepository } from "../interfaces/user.interface";
import { InjectRepository } from "@nestjs/typeorm";

export class UserRepository implements IUserRepository{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:Repository<UserEntity>
    ){}
    async update(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(user);
    }

    async findOneUsername(username:string): Promise<UserEntity> {
        return await this.userRepository.findOne({where:{'username':username}});
    }

    async userExistUsername(username: string): Promise<boolean> {
        const user = await this.userRepository.findOne({where:{'username':username}});

        if(user) return true;
        return false;
    }

    async create(user: RegisterUserDto): Promise<UserEntity> {
        const createdUser = this.userRepository.create(user);
        return await this.userRepository.save(createdUser);
    }

    async find(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async userExistEmail(email: string): Promise<boolean>{
       const user = await this.userRepository.findOne({where:{'email':email}}); 
       
       if(user) return true;
       return false;
    }

}