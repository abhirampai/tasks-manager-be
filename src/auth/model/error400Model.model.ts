import { ApiProperty } from "@nestjs/swagger";

export class errorAuth400Model {
    @ApiProperty({type:Number,example:400})
    statusCode:number

    @ApiProperty({type:String,example:"User with this username already exist"})
    message:string

    @ApiProperty({type:String,example:"Bad Request"})
    error:string;
}