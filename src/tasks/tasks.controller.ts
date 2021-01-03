import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiProperty, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { createTaskResponse } from './models/createTaskResponse.model';
import { createTaskDto, getTaskFilter, updateTaskStatus } from './dto';
import { TaskStatus } from './models/task-status.enum';
import { TasksService } from './tasks.service';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { updateTaskResponse } from './models/updateTaskResponse.model';
import { Task } from './entity/Task.entity';
import { error404Model } from './models/error404Model.model';
import {error400Model} from './models/error400Model.model'
import { AuthGuard } from 'src/auth/Auth-Guard';
import { User } from 'src/auth/entity/User.entity';
import { GetUser } from 'src/auth/getUser.decorator';

@ApiTags('Task-Management')
@Controller('tasks')
@ApiBearerAuth()
@UseGuards(new AuthGuard())
export class TasksController {
    constructor(private tasksService:TasksService){}
    
    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto:getTaskFilter,
        @GetUser() user:User,
        ): Promise<Task[]> {
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTaskWithFilter(filterDto,user)
        }
        else {
            return this.tasksService.getAllTasks(user);
        }
        
    }

    @Post()
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({description:'Task Created',type:createTaskResponse})
    createTask(
        @Body() createTaskDto:createTaskDto,
        @GetUser() user: User,
        ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto.title,createTaskDto.description,user);
    }

    @Get(':id')
    @ApiOkResponse({description:'Task Retrieved',type:createTaskResponse})
    @ApiNotFoundResponse({description:'Such a Task Does not exist',type:error404Model})
    @ApiBadRequestResponse({description:'Bad Request',type:error400Model})
    getById(
        @Param('id') _id:string,
        @GetUser() user:User,
        ): Promise<Task> {
         return this.tasksService.getById(_id,user);
     }

    @Delete(':id')
    @ApiOkResponse({description:'Task Deleted',type:createTaskResponse})
    @ApiNotFoundResponse({description:'Such a Task Does not exist',type:error404Model})
    @ApiBadRequestResponse({description:'Bad Request',type:error400Model})
    deleteTask(
        @Param('id') _id:string,
        @GetUser() user:User,
        ): Promise<Task> {
        return this.tasksService.deleteTask(_id,user);
    }

    @Patch(':id')
    @ApiOkResponse({description:'Task Updated',type:updateTaskResponse})
    @ApiNotFoundResponse({description:'Such a Task Does not exist',type:error404Model})
    @ApiBadRequestResponse({description:'Bad Request',type:error400Model})
    updateTask(
        @Param('id') _id:string,
        @Body('status',TaskStatusValidationPipe) updateTaskDto:updateTaskStatus,
        @GetUser() user:User,
        ) {
        return this.tasksService.updateTaskStatus(_id,updateTaskDto,user)
    } 
}
