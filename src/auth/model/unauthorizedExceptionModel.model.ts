import { ApiProperty } from "@nestjs/swagger";

export class UnauthorizedExceptionModel {
    @ApiProperty({type:Number,example:401})
    statusCode:number

    @ApiProperty({type:String,example:"Such a user does not exist or Invalid username or password"})
    message:string

    @ApiProperty({type:String,example:"Unauthorized"})
    error:string;
}