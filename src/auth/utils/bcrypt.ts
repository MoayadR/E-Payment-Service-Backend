import * as bcrypt from "bcrypt";
import { IPasswordHasher } from "../interfaces/passwordHasher.interface";

export const IPasswordHasherToken = Symbol("IPasswordHasher");
export class PasswordHasher implements IPasswordHasher{

    hashPassword(rawPassword:string):string{
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword , SALT);
    }

    comparePasswords(rawPassword:string , hash:string):boolean{
        return bcrypt.compareSync(rawPassword , hash);
    }
}
