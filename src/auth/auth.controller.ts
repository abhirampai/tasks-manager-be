import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './Auth-Guard';
import { AuthService } from './auth.service';
import { AuthCredentialLoginDTO, AuthCredentialSignUpDTO } from './dto';
import { errorAuth400Model } from './model/error400Model.model';

@ApiTags('Auth-Management')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @Get('user')
    getUser(@Req() req:any) {
        return this.authService.getUser(req.user)
    }

    @Post('login')
    loginUser(@Body() loginDto:AuthCredentialLoginDTO) {
        return this.authService.login(loginDto)
    }

    @Post('signUp')
    @ApiBadRequestResponse({description:'Bad Request',type:errorAuth400Model})
    signUP(@Body(ValidationPipe) signUp:AuthCredentialSignUpDTO) {
        return this.authService.signup(signUp)
    }
}

