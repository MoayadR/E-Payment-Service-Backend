
export interface IPasswordHasher{
    hashPassword(rawPassword:string):string

    comparePasswords(rawPassword:string , hash:string):boolean
}