import { Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResetPassDto} from './dto/reset-password.dto';
@Injectable()
export class AuthServiceService {
      userdata = [
        {
            id:1,
            name:"Shatish",
            email:"shatishscientist1@gmail.com",
            mobile:"6385689365",
            password:"Champions@2025"
        }
    ]

    getlastid():number{
        return this.userdata.sort((a,b) => b.id - a.id)[0].id
    }

    
    

    registerUser( createuserDto: CreateUserDto)
    {
        const newdata = {
            id: this.getlastid() + 1,
            ...createuserDto}
        
        const tempuser =  this.userdata.find(user=> (newdata.email === user.email || newdata.mobile  === user.mobile))
        if(tempuser){
            if(tempuser.mobile  === newdata.mobile && tempuser.email === newdata.email){
            return `User Already Exist as${JSON.stringify(tempuser.name)} with this Mobile and Mail ID. Try Logging In` }
            else{
                if(tempuser.mobile  === newdata.mobile){
                    return `Already User ${tempuser.name} Registered with this Mobile Number `
                }
                else{
                    return `Already User ${tempuser.name} Registered with this MailID `
                }
            }
        }
        else{
        const hashed = bcrypt.hashSync(newdata.password,10)
        newdata.password = hashed
        this.userdata.push(newdata);
        return `Successfully Registered User : ${newdata.name}`
        }
    }
    
    loginUser(loginuserdto:LoginUserDto){
        const loginuser = this.userdata.find(user => (loginuserdto.mobileoremail===user.mobile || loginuserdto.mobileoremail===user.email))
        if(!loginuser){
            throw new NotFoundException
        }
        else{
            
            if(bcrypt.compareSync(loginuserdto.password,loginuser.password)){
                return `Successfully Logged in Mr ${loginuser.name}`}
            else{

                 throw new UnauthorizedException('Wrong Password',{
                    description:"Password Did Not Match (Password is CaseSensitive)",
                
            })
            }

        }
    }
    reset_pass(id:number, resetpassworddto :ResetPassDto){
    
                try{
                   const tempuser =  this.userdata.find(user=> (user.id === id && user.mobile === resetpassworddto.mobileoremail))
                   if(!tempuser){
                   return `User Not Found`}
                   tempuser.password = resetpassworddto.new_pass
                   return  `Successfully Updated the Password:${JSON.stringify(tempuser)}`

                }   
                catch(error){
                    return error
                }
                
    }
    
}