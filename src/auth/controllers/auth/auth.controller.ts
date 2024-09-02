import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
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
        return await this.authService.signJwtUser((req.user as UserEntity));
    }

    @Get('status')
    @UseGuards(JwtGuard)
    async status(@Req() req:Request){
        return req.user;
    } 
}
