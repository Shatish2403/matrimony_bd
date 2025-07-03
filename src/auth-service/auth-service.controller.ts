import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResetPassDto} from './dto/reset-password.dto'
import { MobileValDto } from './dto/mobiledto.dto';
import { OtpValDto } from './dto/otpvaldto.dto';
import { Prisma } from 'generated/prisma';

@Controller('auth-service')
export class AuthServiceController {
    constructor(private readonly authservice:AuthServiceService){}


    @Get('forget-password')
    forget_pass():string{
        return `Password Forgot`
    }

    @Post('get-otp')
    get_otp(@Body(ValidationPipe) mobile:MobileValDto){
        return `OTP send to the Given mobile number `
    }

    @Post('verify-otp')
    verify_otp(@Body(ValidationPipe) otp:OtpValDto){
        return `OTP Verified Successfully`
    }

    @Post('register')
    registerUser(@Body(ValidationPipe) createuserdto: CreateUserDto){
        return this.authservice.registerUser(createuserdto)
    }
    
    @Post('login')
    loginUser(@Body(ValidationPipe) loginuserdto:LoginUserDto){
        return this.authservice.loginUser(loginuserdto)
    }

    @Patch(':id')
    reset_pass(@Param('id', ParseIntPipe) id:number, @Body(ValidationPipe) resetpassworddto:ResetPassDto)
    {
       return this.authservice.reset_pass(id,resetpassworddto)
    }

    
}
