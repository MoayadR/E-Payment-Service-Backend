import { Controller, Get} from '@nestjs/common';
import { UserService } from '../services/user/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService,
    ){}

    @Get()
    async getAllUsers(){
        return await this.userService.getUsers();
    }

}
