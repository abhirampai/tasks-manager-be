import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "../models/task.model";

export class getTaskFilter {
    @ApiProperty({type:String,example:'string'})
    status:TaskStatus

    @ApiProperty({type:String,example:'string'})
    searchTerm:string
}