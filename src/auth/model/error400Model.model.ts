import { ApiProperty } from "@nestjs/swagger";

export class errorAuth400Model {
    @ApiProperty({type:Number,example:400})
    statusCode:number

    @ApiProperty({type:String,example:"Password and Confirm Passwords do not match"})
    message:string

    @ApiProperty({type:String,example:"Bad Request"})
    error:string;
}