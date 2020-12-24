import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiParam, ApiProperty, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import { createTaskResponse } from './models/createTaskResponse.model';
import { createTaskDto, getTaskFilter, updateTaskStatus } from './dto';
import { Task, TaskStatus } from './models/task.model';
import { TasksService } from './tasks.service';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}
    
    @Get()
    getTasks(@Query(ValidationPipe) filterDto:getTaskFilter): Task[] {
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
    createTask(@Body() createTaskDto:createTaskDto): Task {
        return this.tasksService.createTask(createTaskDto.title,createTaskDto.description);
    }

    @Get(':id')
    getById(@Param('id') _id:string): Task {
        return this.tasksService.getById(_id);
    }

    @Delete(':id')
    deleteTask(@Param('id') _id:string): Task {
        return this.tasksService.deleteTask(_id);
    }

    @Patch(':id')
    @UsePipes(new TaskStatusValidationPipe())
    updateTask(@Param('id') _id:string,@Body() updateTaskDto:updateTaskStatus) {
        return this.tasksService.updateTaskStatus(_id,updateTaskDto.status)
    }
}
