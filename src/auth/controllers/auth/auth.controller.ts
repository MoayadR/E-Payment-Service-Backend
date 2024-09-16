import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Req, UnauthorizedException, UseGuards, } from '@nestjs/common';
import { Request } from 'express';
import { refreshTokenDto } from 'src/auth/dto/refreshToken.dto';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { ActiveUserGuard } from 'src/auth/guards/activeUser.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { LocalGuard } from 'src/auth/guards/local.guard';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { EmailService } from 'src/email/services/email.service';
import { UserEntity, } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService,
        private readonly emailService:EmailService 
    ){}

    @Post('register')
    async register(@Body() payload:RegisterUserDto):Promise<any>{

       if(!await this.authService.isValidRegisterEmail(payload.email))
            throw new HttpException("The Email Already Exist!" , HttpStatus.BAD_REQUEST);
       if(!await this.authService.isValidRegisterUsername(payload.username))
            throw new HttpException("The Username Already Exist!" , HttpStatus.BAD_REQUEST);

       const user = await this.authService.createUser(payload);

       // make auth service create email verification
       const emailVerification = await this.emailService.createEmailVerification(user);

       // make auth service send email verification
       this.emailService.sendVerficationEmail(user.email , emailVerification.verificationToken);

       return user; 
    }

    @Post('admin')
    async registerAdmin(@Body() payload:RegisterUserDto):Promise<any>{

       if(!await this.authService.isValidRegisterEmail(payload.email))
            throw new HttpException("The Email Already Exist!" , HttpStatus.BAD_REQUEST);
       if(!await this.authService.isValidRegisterUsername(payload.username))
            throw new HttpException("The Username Already Exist!" , HttpStatus.BAD_REQUEST);

       const user = await this.authService.createAdmin(payload);
    
       return user; 
    }

    @Post('login')
    @UseGuards(ActiveUserGuard)
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

    @Put('refresh')
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

    @Get('verify/:verificationToken')
    async verifyUser(@Param('verificationToken')verificationToken:string){
       const emailVerification = await this.emailService.getEmailVerificationWithToken(verificationToken); 
       if (!emailVerification) throw new UnauthorizedException("Invalid Verfication link");

        this.emailService.deleteEmailVerification(emailVerification);
        emailVerification.user.isActive = true;
        return this.authService.updateUser(emailVerification.user); 
    }

}
