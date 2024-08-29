import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get()
    getAllUsers():any {
        return this.userService.users;
    }

}
