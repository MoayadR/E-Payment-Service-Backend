import { RegisterUserDto } from "../../auth/dto/registerUser.dto";
import { UserEntity } from "../entities/user.entity";

export const IUserRepositoryToken = Symbol("IUserRepository")
export interface IUserRepository{

    createUser(user:RegisterUserDto):Promise<UserEntity>
    createAdmin(user:RegisterUserDto):Promise<UserEntity>

    find():Promise<UserEntity[]>
    findOneUsername(username:string):Promise<UserEntity>
    findOneID(id:number):Promise<UserEntity>

    userExistUsername(username:string):Promise<boolean>
    userExistEmail(email:string):Promise<boolean>

    update(user:UserEntity):Promise<UserEntity>
}