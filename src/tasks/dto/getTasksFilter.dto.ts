import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../models/task-status.enum";

export class getTaskFilter {
    @ApiProperty({type:String,example:'string'})
    @IsOptional()
    @IsIn([TaskStatus.OPEN,TaskStatus.INPROGRESS,TaskStatus.DONE])
    status:TaskStatus

    @ApiProperty({type:String,example:'string'})
    searchTerm:string
}