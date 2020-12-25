import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialLoginDTO, AuthCredentialSignUpDTO } from "./dto";
import { User } from "./entity/User.entity";
import * as bcrypt from 'bcryptjs';
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";



@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signup(signUpDTO:AuthCredentialSignUpDTO): Promise<User> {
        const {username,password,confirmPass} = signUpDTO
        const user = await this.findOne({username:username})
        if(!user)
        {
            if(password === confirmPass)
            {
                const newUser = new User()
                newUser.username = username
                newUser.password = await bcrypt.hash(password,10);

                await this.save(newUser)
                delete newUser.password
                return newUser
            }
            else
            {
                throw new BadRequestException('Password and Confirm Password do not match')
            }
        }
        else{
            throw new BadRequestException('User with this username already exist')
        }
    }

    async getUser(username:string,password:string): Promise<User> {
        const user = await this.findOne({username:username})
        if(!user){
            throw new UnauthorizedException('Such a user does not exist')
        }
        else
        {
            const match = await bcrypt.compare(password,user.password)
            if(match)
            {
                return user
            }
            else 
            {
                throw new UnauthorizedException('Invalid username or password')
            }
        }
    }
    async login(loginDTo:AuthCredentialLoginDTO,jwtService:JwtService) {
        const user = await this.getUser(loginDTo.username,loginDTo.password)
        const {username,id} = user
        const payload = {username,id}
        return {
            sucess:true,
            access_token: jwtService.sign(payload)
        }
    }
}