import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    users = [{
        "name" : "moayad",
        "email" : "moayad@moayad.com"
    }]
}
