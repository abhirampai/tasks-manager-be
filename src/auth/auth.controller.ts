import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from './Auth-Guard';
import { AuthService } from './auth.service';
import { AuthCredentialLoginDTO, AuthCredentialSignUpDTO } from './dto';
import { errorAuth400Model } from './model/error400Model.model';
import { errorAuthConflictModel } from './model/errorAuthConflictModel.model';
import { loginSuccess } from './model/loginSuccess.model';
import { signUpSuccess } from './model/signUpSuccess.model';
import { UnauthorizedExceptionModel } from './model/unauthorizedExceptionModel.model';

@ApiTags('Auth-Management')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    @ApiOkResponse({description:'user retrieved',type:signUpSuccess})
    @ApiUnauthorizedResponse({description:'user does not exist',type:UnauthorizedExceptionModel})
    @Get('user')
    getUser(@Req() req:any) {
        return this.authService.getUser(req.user)
    }

    @Post('login')
    @ApiCreatedResponse({description:'found',type:loginSuccess})
    @ApiUnauthorizedResponse({description:'Unauthorized',type:UnauthorizedExceptionModel})
    loginUser(@Body() loginDto:AuthCredentialLoginDTO) {
        return this.authService.login(loginDto)
    }

    @Post('signUp')
    @ApiCreatedResponse({description:'OK Response',type:signUpSuccess})
    @ApiConflictResponse({description:'User exists',type:errorAuthConflictModel})
    @ApiBadRequestResponse({description:'Bad Requesnt',type:errorAuth400Model})
    signUP(@Body(ValidationPipe) signUp:AuthCredentialSignUpDTO) {
        return this.authService.signup(signUp)
    }
}

