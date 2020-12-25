import { ApiProperty } from "@nestjs/swagger";

export class loginSuccess {
    @ApiProperty({type:String,example:'true'})
    success:string

    @ApiProperty({type:String,example:"string"})
    access_token:string
}