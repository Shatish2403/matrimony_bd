import { Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResetPassDto} from './dto/reset-password.dto';
import { DatabaseService } from 'src/database/database.service';
import { error } from 'console';

@Injectable()


export class AuthServiceService {
    constructor(private readonly databaseService:DatabaseService){}
   async registerUser( createuserDto: CreateUserDto)
    {
        const tempuser = await this.databaseService.users.findMany({
            where:{
                OR:[
                    {mobile:createuserDto.mobile},
                    {email:createuserDto.email}
                ]
            },
        })
        if(tempuser===null){
            return `User Already exist as ${tempuser}`
        }
        else{

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(createuserDto.password,salt)
            createuserDto.password = hash
            return await this.databaseService.users.create({data : createuserDto})
        }
            
    }
    
    async loginUser(loginuserdto:LoginUserDto){
        const loginuser = await this.databaseService.users.findFirst
        ({
            where:{
                OR:[
                    {mobile:loginuserdto.mobileoremail},
                    {email:loginuserdto.mobileoremail}
                ],
            }
        }
        )
        if(!loginuser){
            throw new NotFoundException
        }
        else{
            
            if(bcrypt.compareSync(loginuserdto.password,loginuser.password))
                {
                return `Successfully Logged in Mr ${loginuser.name}`}

            else{

                 throw new UnauthorizedException('Wrong Password',{
                    description:"Password Did Not Match (Password is CaseSensitive)",
                
            })
            }

        }
    }
    async reset_pass(id:number, resetpassworddto :ResetPassDto){
    
                try{
                   const tempuser =  await this.databaseService.users.findUnique({
                    where:{
                        id,
                    }
                   })

                   if(!tempuser)
                    {return `User Not Found`}
                   try{
                   tempuser.password = resetpassworddto.new_pass
                   return  await this.databaseService.users.update({
                    where :{
                        id,
                    },
                    data:{
                        password:resetpassworddto.new_pass,
                    }
                        })
                    }
                    catch(error){
                        return `Error Resetting Password Try Again Later`
                    }
                }   
                catch(error){
                    return error
                }
                
    }
    
}