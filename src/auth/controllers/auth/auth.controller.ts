import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { refreshTokenDto } from 'src/auth/dto/refreshToken.dto';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { LocalGuard } from 'src/auth/guards/local.guard';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService ){}

    @Post('register')
    @UsePipes(ValidationPipe)
    async register(@Body() payload:RegisterUserDto):Promise<any>{

       if(!await this.authService.isValidRegisterEmail(payload.email))
            throw new HttpException("The Email Already Exist!" , HttpStatus.BAD_REQUEST);
       if(!await this.authService.isValidRegisterUsername(payload.username))
            throw new HttpException("The Username Already Exist!" , HttpStatus.BAD_REQUEST);

       return this.authService.createUser(payload);
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    @UseGuards(LocalGuard)
    async login(@Req() req:Request){
        const jwt =  await this.authService.signJwtUser((req.user as UserEntity));
        const token = await this.authService.getRefreshToken(req.user as UserEntity);

        let refreshToken;

        if (!token){
            refreshToken = (await this.authService.createRefreshToken(req.user as UserEntity)).refreshToken;
        }
        else{
            if (this.authService.isValidRefreshToken(token))
            {
                refreshToken = token.refreshToken;
            }
            else{
                await this.authService.deleteRefreshToken(token);
                refreshToken = (await this.authService.createRefreshToken(req.user as UserEntity)).refreshToken;
            }
        }
        
        return {
            jwt,
            refreshToken,
        };
    }

    @Post('refresh')
    async refreshRefreshToken(@Body() payload:refreshTokenDto){
        const token = await this.authService.getRefreshTokenByToken(payload.refreshToken); 

        if (!token)
            throw new UnauthorizedException("Refresh Token is Invalid");

        await this.authService.deleteRefreshToken(token);

        if (!this.authService.isValidRefreshToken(token)){
            throw new UnauthorizedException("Refresh Token is Invalid");
        }

        const {refreshToken} =await this.authService.createRefreshToken(token.user);

        const jwt =  await this.authService.signJwtUser(token.user);
        return {jwt , refreshToken} 
    }

    @Get('status')
    @UseGuards(JwtGuard)
    async status(@Req() req:Request){
        return req.user;
    } 
}
