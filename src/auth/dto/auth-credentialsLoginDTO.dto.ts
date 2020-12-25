import { ApiProperty } from "@nestjs/swagger";

export class AuthCredentialLoginDTO {
    @ApiProperty({type:String,example:"string"})
    username:string;

    @ApiProperty({type:String,example:"string"})
    password:string;
    
}