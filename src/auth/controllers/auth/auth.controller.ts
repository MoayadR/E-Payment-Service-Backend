import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { UserService } from 'src/user/services/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService:UserService){}

    @Post('register')
    @UsePipes(ValidationPipe)
    register(@Body() payload:RegisterUserDto){
       return this.userService.createUser(payload); 
    }

    // @Post('login')
    // login(@Body() payload){
        
    // }

}
