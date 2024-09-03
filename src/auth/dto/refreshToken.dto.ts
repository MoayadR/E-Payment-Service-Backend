import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class refreshTokenDto{

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    refreshToken:string
}