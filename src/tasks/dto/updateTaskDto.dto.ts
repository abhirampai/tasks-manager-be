import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "../models/task.model";

export class updateTaskStatus {
    @ApiProperty({type:String,example:'string'})
    status:TaskStatus
}