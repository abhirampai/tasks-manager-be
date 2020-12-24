import {  BadRequestException, PipeTransform } from "@nestjs/common";
import {TaskStatus} from '../models/task.model';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.INPROGRESS,
        TaskStatus.DONE,
    ]

    transform(value:any) {
        console.log(value.status)
        if(!this.isStatusValid(value.status))
        {
            throw new BadRequestException(value.status+" is invalid value for status")
        }
        value.status = value.status.toUpperCase();
        
        return value.status;
    }
    private isStatusValid(status: any) {
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}