import {  BadRequestException, PipeTransform } from "@nestjs/common";
import {TaskStatus} from '../models/task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.INPROGRESS,
        TaskStatus.DONE,
    ]

    transform(value:any) {
        if(!this.isStatusValid(value))
        {
            throw new BadRequestException(value+" is invalid value for status")
        }
        value = value.toUpperCase();
        return value;
    }
    private isStatusValid(status: any) {
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}