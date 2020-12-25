import { ApiProperty } from "@nestjs/swagger";

export class errorAuthConflictModel {
    @ApiProperty({type:Number,example:409})
    statusCode:number

    @ApiProperty({type:String,example:"User with this username already exist"})
    message:string

    @ApiProperty({type:String,example:"Conflict"})
    error:string;
}