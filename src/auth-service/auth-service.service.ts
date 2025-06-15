import { Injectable, Res } from '@nestjs/common';

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

    getuser(mobileoremail:string):number{

        const user = this.userdata.find(tempuser => (tempuser.mobile ===mobileoremail || tempuser.email ===mobileoremail))
        if(!user){
            throw new Error("User Not Found")
        }
        else{
            return user.id
        }
    }

    change_pass(id:number,new_pass:string){
        try {
        this.userdata[id].password = new_pass  
        }
        catch(error){
            throw error
        }
    }

    registerUser( registerdata: {name:string,email:string,mobile:string,password:string})
    {
        console.log('Incoming Register Data:', registerdata);
        const newdata = {
            id: this.getlastid() + 1,
            ...registerdata}
        this.userdata.push(newdata);

        console.log('Registered Users:', this.userdata);
        return `Successfully Registered User : ${newdata.name}`
    }
    
    loginUser(logindata:{mobileoremail:string,password:string}){
        const loginuser = this.userdata.find(user => (logindata.mobileoremail===user.mobile || logindata.mobileoremail===user.email) && logindata.password === user.password)
        if(!loginuser){
            return `No User Found`
        }
        else{
            return `Successfully Logged in Mr ${loginuser.name}`
        }
    }
    reset_pass(reset_data :{mobileoremail:string,new_pass:string}){
    
                const tempuser = this.getuser(reset_data.mobileoremail)
                try{
                this.change_pass(tempuser,reset_data.new_pass) 
                return this.userdata[tempuser].email
                }
                catch(err){
                    return err
                }
                
    }
    
}