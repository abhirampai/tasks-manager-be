import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './models/task-status.enum';
import { getTaskFilter} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './entity/Task.entity';
const ObjectId = require('mongodb').ObjectID;

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private readonly taskRepository:TaskRepository,
    ){}


    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

     async createTask(title: string, description: string): Promise<Task> {
         const task = new Task();
         task.title = title;
         task.description = description;
         task.status = TaskStatus.OPEN;
         await this.taskRepository.save(task)
    //     this.tasks.push(task);
         return task;
     }

     async getById(id:string): Promise<Task> {
        if(id.length!==24)
        {
            throw new BadRequestException('Enter A correct Id')
        }
        const found = await this.taskRepository.findOne(ObjectId(id))
         if(!found){
             throw new NotFoundException('Such a task with id '+id+' does not exist')
         }
         return found
     }

    async deleteTask(id:string): Promise<Task> {
        const taskToRemove = await this.getById(id)
        await this.taskRepository.remove(taskToRemove)
        return taskToRemove
    }

    async updateTaskStatus(id:string,status:any): Promise<Task> {
        const task = await this.getById(id)
        task.status = status
        await this.taskRepository.save(task)
        return task
    }

    async getTaskWithFilter(filterDto:getTaskFilter): Promise<Task[]> {
        const {status,searchTerm } = filterDto
        let tasks = await this.getAllTasks()
        if(status) {
            tasks = tasks.filter(task => task.status === status)
        }
        if(searchTerm){
            tasks = tasks.filter(task => 
                task.title.includes(searchTerm)||
                task.description.includes(searchTerm))
        }
        return tasks
    }

}
