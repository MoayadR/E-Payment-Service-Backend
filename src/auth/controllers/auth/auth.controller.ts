import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
        await this.authService.deleteRefreshToken(req.user as UserEntity);
        const {refreshToken} = await this.authService.generateRefreshToken(req.user as UserEntity);
        return {
            jwt,
            refreshToken,
        };
    }

    @Post('refresh')
    async refreshRefreshToken(@Body() payload:refreshTokenDto){
        const token = await this.authService.getRefreshTokenByToken(payload.refreshToken); 
        if (!token) throw new HttpException("The Token is no longer Valid" , HttpStatus.BAD_REQUEST);

        await this.authService.deleteRefreshToken(token.user);

        const {refreshToken} =await this.authService.generateRefreshToken(token.user);

        const jwt =  await this.authService.signJwtUser(token.user);
        return {jwt , refreshToken} 
    }

    @Get('status')
    @UseGuards(JwtGuard)
    async status(@Req() req:Request){
        return req.user;
    } 
}
