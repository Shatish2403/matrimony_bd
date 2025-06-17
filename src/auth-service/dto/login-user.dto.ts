import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto{

    @IsNotEmpty()
    @IsString()
    mobileoremail:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}