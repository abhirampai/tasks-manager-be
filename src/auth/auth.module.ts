import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entity/User.entity';
import { UserRepository } from './user.repository';
require('dotenv').config();

@Module({
  imports:[
    TypeOrmModule.forFeature([User,UserRepository]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
