import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { CreateUserDto } from '../dto/createUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get()
    async getAllUsers(){
        return await this.userService.getUsers();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() payload:CreateUserDto){
        return this.userService.createUser(payload);
    }

}
