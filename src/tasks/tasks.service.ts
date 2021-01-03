import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './models/task-status.enum';
import { getTaskFilter} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './entity/Task.entity';
import { User } from 'src/auth/entity/User.entity';
const ObjectId = require('mongodb').ObjectID;

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private readonly taskRepository:TaskRepository,
    ){}


    async getAllTasks(user:User): Promise<Task[]> {
        return await this.taskRepository.find({user:user});
    }

     async createTask(title: string, description: string,user:User): Promise<Task> {
         const task = new Task();
         task.title = title;
         task.description = description;
         task.status = TaskStatus.OPEN;
         task.user = user;
         await this.taskRepository.save(task)
         delete task.user;
    //     this.tasks.push(task);
         return task;
     }

     async getById(id:string,user:User): Promise<Task> {
        if(id.length!==24)
        {
            throw new BadRequestException('Enter A correct Id')
        }
        const found = await this.taskRepository.findOne({_id:ObjectId(id),user:user})
         if(!found){
             throw new NotFoundException('Such a task with id '+id+' does not exist')
         }
         return found
     }

    async deleteTask(id:string,user:User): Promise<Task> {
        const taskToRemove = await this.getById(id,user)
        await this.taskRepository.remove(taskToRemove)
        return taskToRemove
    }

    async updateTaskStatus(id:string,status:any,user:User): Promise<Task> {
        const task = await this.getById(id,user)
        task.status = status
        await this.taskRepository.save(task)
        return task
    }

    async getTaskWithFilter(filterDto:getTaskFilter,user:User): Promise<Task[]> {
        const {status,searchTerm } = filterDto
        let tasks = await this.getAllTasks(user)
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
