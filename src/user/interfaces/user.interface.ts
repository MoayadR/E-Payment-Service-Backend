import { RegisterUserDto } from "../../auth/dto/registerUser.dto";
import { UserEntity } from "../entities/user.entity";

export const IUserRepositoryToken = Symbol("IUserRepository")
export interface IUserRepository{

    create(user:RegisterUserDto):Promise<UserEntity>

    find():Promise<UserEntity[]>

    userExist(email:string):Promise<boolean>

}