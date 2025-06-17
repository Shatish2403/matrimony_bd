import { IsNotEmpty, IsString } from "class-validator";

export class OtpValDto{

    @IsNotEmpty()
    @IsString()
    otp:number
}