import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { RefreshToken } from 'src/auth/entities/refreshToken.entity';
import { IRefreshTokenRepository, IRefreshTokenSymbol } from 'src/auth/interfaces/refreshToken.interface';
import { comparePasswords, hashPassword } from 'src/auth/utils/bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService, private userService:UserService , @Inject(IRefreshTokenSymbol) private refreshTokenRepo:IRefreshTokenRepository ){}

    async isValidRegisterEmail(email:string):Promise<boolean>{
        if (await this.userService.userExistEmail(email)){
            return false;
        } 
        return true;
    }
    async isValidRegisterUsername(username:string):Promise<boolean>{
        if (await this.userService.userExistUsername(username)){
            return false;
        } 
        return true;
    }

    async validateLoginUser(payload:LoginUserDto){
        const user = await this.userService.getUserByUsername(payload.username); 
        
        if (!user)
            return null;

        if ( comparePasswords(payload.password , user.password))
            return user

        return null;
    }

    async createUser(payload:RegisterUserDto){
       const password = hashPassword(payload.password);
       return await this.userService.createUser({...payload , password}); 
    }

    async signJwtUser(user:UserEntity){
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password , walletBalance , ...partialUser} = user;
        return this.jwtService.sign(partialUser);
    }

    async getRefreshToken(user:UserEntity){
        return await this.refreshTokenRepo.findOne(user); 
    }
    async getRefreshTokenByToken(token:string){
        return await this.refreshTokenRepo.findOneByToken(token); 
    }

    async deleteRefreshToken(token:RefreshToken){
        return await this.refreshTokenRepo.delete(token);
    }

    async createRefreshToken(user:UserEntity){
        return await this.refreshTokenRepo.create(user);
    }

    isValidRefreshToken(token:RefreshToken){
        if (token.expiryDate > new Date())
            return true;
        return false;
    }
}
