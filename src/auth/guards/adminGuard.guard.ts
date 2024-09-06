import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserType } from "src/user/entities/user.entity";


@Injectable()
export class AdminGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const {user} = context.switchToHttp().getRequest();

        return user.type === UserType.admin;
    }
}