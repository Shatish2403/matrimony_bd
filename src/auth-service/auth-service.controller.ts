import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
@Controller('auth-service')
export class AuthServiceController {
    constructor(private readonly authservice:AuthServiceService){}


    @Get('forget-password')
    forget_pass():string{
        return `Password Forgot`
    }

    @Post('get-otp')
    get_otp(mobile:string){
        return `OTP send to the Given mobile number `
    }

    @Post('verify-otp')
    verify_otp(otp:string){
        return `OTP Verified Successfully`
    }

    @Post('register')
    registerUser(@Body() registerdata: {name:string,email:string,mobile:string,password:string}){
        return this.authservice.registerUser(registerdata)
    }
    
    @Post('login')
    loginUser(@Body() logindata:{mobileoremail:string, password:string}){
        return this.authservice.loginUser(logindata)
    }

    @Patch('reset-password')
    reset_pass(@Body() reset_data:{mobileoremail:string,new_pass:string})
    {
       return this.authservice.reset_pass(reset_data)
    }

    
}
