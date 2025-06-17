import { IsNotEmpty, IsString } from 'class-validator'
export class ResetPassDto{
   
    @IsNotEmpty()
    @IsString()
    mobileoremail:string;

    @IsNotEmpty()
    @IsString()
    new_pass:string;

}