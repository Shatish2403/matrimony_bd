import { Injectable, NotFoundException, Res } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
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

    
    

    registerUser( registerdata: {name:string,email:string,mobile:string,password:string})
    {
        const newdata = {
            id: this.getlastid() + 1,
            ...registerdata}
        const hashed = bcrypt.hashSync(registerdata.password,10)
        newdata.password = hashed
        this.userdata.push(newdata);
        return `Successfully Registered User : ${newdata.name}`
    }
    
    loginUser(logindata:{mobileoremail:string,password:string}){
        const loginuser = this.userdata.find(user => (logindata.mobileoremail===user.mobile || logindata.mobileoremail===user.email) &&  bcrypt.compareSync(logindata.password,user.password))
        if(!loginuser){
            return "No User Found"
        }
        else{
            return `Successfully Logged in Mr ${loginuser.name}`
        }
    }
    reset_pass(id:number, reset_data :{mobileoremail:string,new_pass:string}){
    
                try{
                   const tempuser =  {...this.userdata.find(user=> (user.id === id && user.mobile === reset_data.mobileoremail))}
                   if(!tempuser){
                   return `User Not Found`}
                   tempuser.password = reset_data.new_pass
                   return  `Successfully Updated the Password:${JSON.stringify(tempuser)}`

                }   
                catch(error){
                    return error
                }
                
    }
    
}