import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class createTaskDto {
    @ApiProperty({type:String,example:'string'})
    @IsNotEmpty()
    title:string

    @ApiProperty({type:String,example:'string'})
    @IsNotEmpty()
    description:string
}

