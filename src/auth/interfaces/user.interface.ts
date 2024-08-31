import { CreateUserDto } from "../dto/createUser.dto";
import { UserEntity } from "../entities/user.entity";

export const IUserRepositoryToken = Symbol("IUserRepository")
export interface IUserRepository{

    create(user:CreateUserDto):Promise<UserEntity>

    find():Promise<UserEntity[]>

    userExist(email:string):Promise<boolean>

}