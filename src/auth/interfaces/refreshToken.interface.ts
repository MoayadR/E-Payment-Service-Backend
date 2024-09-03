import { UserEntity } from "src/user/entities/user.entity";
import { RefreshToken } from "../entities/refreshToken.entity";
import { DeleteResult } from "typeorm";

export const IRefreshTokenSymbol = Symbol("IRefreshToken");
export interface IRefreshTokenRepository {
    create(user:UserEntity):Promise<RefreshToken>

    findOne(user:UserEntity):Promise<RefreshToken>
    findOneByToken(refreshToken:string):Promise<RefreshToken>

    delete(user:UserEntity):Promise<DeleteResult>
}