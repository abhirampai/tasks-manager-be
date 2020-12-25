import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialSignUpDTO {
    @ApiProperty({type:String,example:"string"})
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username:string;

    @ApiProperty({type:String,example:"string"})
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message:'password is weak'})
    password:string;

    @ApiProperty({type:String,example:"string"})
    confirmPass:string;
}