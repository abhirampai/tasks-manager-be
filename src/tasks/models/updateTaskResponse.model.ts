import { ApiProperty } from "@nestjs/swagger";

export class updateTaskResponse {
    @ApiProperty({type:String,example:'string'})
    id:string

    @ApiProperty({type:String,example:'string'})
    title:string

    @ApiProperty({type:String,example:'string'})
    description:string

    @ApiProperty({ type:String, example:'new status'})
    status:string
}