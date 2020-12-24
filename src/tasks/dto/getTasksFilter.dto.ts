import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../models/task.model";

export class getTaskFilter {
    @ApiProperty({type:String,example:'string'})
    @IsIn([TaskStatus.OPEN,TaskStatus.INPROGRESS,TaskStatus.DONE])
    status:TaskStatus

    @ApiProperty({type:String,example:'string'})
    @IsNotEmpty()
    searchTerm:string
}