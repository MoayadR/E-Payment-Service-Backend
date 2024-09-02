import { Body, Controller, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginUser } from 'src/auth/dto/loginUser.dto';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('register')
    @UsePipes(ValidationPipe)
    async register(@Body() payload:RegisterUserDto):Promise<any>{

       if(!await this.authService.isValidRegisterUserEmail(payload.email))
            throw new HttpException("The Email Already Exist!" , HttpStatus.BAD_REQUEST);
       if(!await this.authService.isValidRegisterUserUsername(payload.username))
            throw new HttpException("The Username Already Exist!" , HttpStatus.BAD_REQUEST);

       return this.authService.createUser(payload);
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() payload:LoginUser){
        const jwtToken = await this.authService.validateLoginUser(payload);
        if(jwtToken)
            return jwtToken;

        throw new HttpException("Invalid Credes" , HttpStatus.UNAUTHORIZED);
    }

}
