import { UserEntity } from "src/user/entities/user.entity";
import { RefreshToken } from "../entities/refreshToken.entity";
import { IRefreshTokenRepository } from "../interfaces/refreshToken.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export class RefreshTokenRepository implements IRefreshTokenRepository{
    constructor(@InjectRepository(RefreshToken) private readonly refreshTokenRepo:Repository<RefreshToken> ){}

    async findOneByToken(refreshToken: string): Promise<RefreshToken> {
         return await this.refreshTokenRepo.findOne({where:{refreshToken:refreshToken} , relations:['user']});
    }

    async delete(user: UserEntity): Promise<DeleteResult> {
        const refresh = await this.refreshTokenRepo.findOne({where:{user:user}});
        if(!refresh) return null;
        return this.refreshTokenRepo.delete(refresh);
    }

    async create(user: UserEntity): Promise<RefreshToken> {
        const refresh = uuidv4();
        const date = new Date();
        date.setDate(date.getDate() + 5);
        
        const token = this.refreshTokenRepo.create({refreshToken:refresh,user:user , expiryDate:date});
        
        return await this.refreshTokenRepo.save(token);
    }

    findOne(user:UserEntity): Promise<RefreshToken> {
        return this.refreshTokenRepo.findOne({where:{user:user}});
    }

}