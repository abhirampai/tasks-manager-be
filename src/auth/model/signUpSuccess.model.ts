import { ApiProperty } from "@nestjs/swagger";

export class signUpSuccess {
    @ApiProperty({type:String,example:'string'})
    id:string

    @ApiProperty({type:String,example:"string"})
    username:string
}