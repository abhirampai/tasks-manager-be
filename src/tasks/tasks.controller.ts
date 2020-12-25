import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiProperty, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import { createTaskResponse } from './models/createTaskResponse.model';
import { createTaskDto, getTaskFilter, updateTaskStatus } from './dto';
import { TaskStatus } from './models/task-status.enum';
import { TasksService } from './tasks.service';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { updateTaskResponse } from './models/updateTaskResponse.model';
import { Task } from './entity/Task.entity';
import { error404Model } from './models/error404Model.model';
import {error400Model} from './models/error400Model.model'

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}
    
    @Get()
    getTasks(@Query(ValidationPipe) filterDto:getTaskFilter): Promise<Task[]> {
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTaskWithFilter(filterDto)
        }
        else {
            return this.tasksService.getAllTasks();
        }
        
    }

    @Post()
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({description:'Task Created',type:createTaskResponse})
    createTask(@Body() createTaskDto:createTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto.title,createTaskDto.description);
    }

    @Get(':id')
    @ApiOkResponse({description:'Task Retrieved',type:createTaskResponse})
    @ApiNotFoundResponse({description:'Such a Task Does not exist',type:error404Model})
    @ApiBadRequestResponse({description:'Bad Request',type:error400Model})
    getById(@Param('id') _id:string): Promise<Task> {
         return this.tasksService.getById(_id);
     }

    @Delete(':id')
    @ApiOkResponse({description:'Task Retrieved',type:createTaskResponse})
    @ApiNotFoundResponse({description:'Such a Task Does not exist',type:error404Model})
    @ApiBadRequestResponse({description:'Bad Request',type:error400Model})
    deleteTask(@Param('id') _id:string): Promise<Task> {
        return this.tasksService.deleteTask(_id);
    }

    @Patch(':id')
    @ApiOkResponse({description:'Task Retrieved',type:updateTaskResponse})
    @ApiNotFoundResponse({description:'Such a Task Does not exist',type:error404Model})
    @ApiBadRequestResponse({description:'Bad Request',type:error400Model})
    updateTask(@Param('id') _id:string,@Body('status',TaskStatusValidationPipe) updateTaskDto:updateTaskStatus) {
        return this.tasksService.updateTaskStatus(_id,updateTaskDto)
    } 
}
