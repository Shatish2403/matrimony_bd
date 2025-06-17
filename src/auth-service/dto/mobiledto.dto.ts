import { IsNotEmpty, IsString } from "class-validator";

export class MobileValDto{
    @IsString() 
    @IsNotEmpty()
    mobile:string;
}