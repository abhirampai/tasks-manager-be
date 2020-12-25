import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialLoginDTO, AuthCredentialSignUpDTO } from './dto';
import { User } from './entity/User.entity';
import { UserRepository } from './user.repository';
const ObjectId = require('mongodb').ObjectID;

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository:UserRepository,
        private readonly  jwtService:JwtService
    ){}

    async login(loginDto:AuthCredentialLoginDTO): Promise<any>{
        return await this.userRepository.login(loginDto,this.jwtService)
    }

    async signup(signUp:AuthCredentialSignUpDTO): Promise<User> {
        return await this.userRepository.signup(signUp)
    }

    async getUser(req:any): Promise<any>{
        const user = await this.userRepository.findOne(ObjectId(req.id))
        if(!user)
        {
            throw new UnauthorizedException('Such a user does not exist')
        }
        else
        {
            delete user.password
            return user
        }
    }
}
