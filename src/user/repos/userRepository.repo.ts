import { Repository } from "typeorm";
import { RegisterUserDto } from "../../auth/dto/registerUser.dto";
import { UserEntity, UserType } from "../entities/user.entity";
import { IUserRepository } from "../interfaces/user.interface";
import { InjectRepository } from "@nestjs/typeorm";

export class UserRepository implements IUserRepository{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:Repository<UserEntity>
    ){}

    createAdmin(user: RegisterUserDto): Promise<UserEntity> {
        const createdAdmin = this.userRepository.create({...user , isActive:true , userType:UserType.admin});
        return this.userRepository.save(createdAdmin);
    }

    async findOneID(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({where:{'id':id}});
    }
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

    async createUser(user: RegisterUserDto): Promise<UserEntity> {
        const createdUser = this.userRepository.create({...user , isActive:false , userType:UserType.user});
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