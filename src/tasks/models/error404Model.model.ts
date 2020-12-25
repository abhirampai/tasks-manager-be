import { ApiProperty } from "@nestjs/swagger";

export class error404Model {
    @ApiProperty({type:Number,example:'404'})
    status:number

    @ApiProperty({type:String,example:'Such a task with id (string) does not exist'})
    message:string
}