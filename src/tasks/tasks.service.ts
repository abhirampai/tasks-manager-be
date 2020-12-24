import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './models/task.model';
import { v4 as uuidv4 } from 'uuid';
import { stat } from 'fs';
import { getTaskFilter } from './dto';
@Injectable()
export class TasksService {
    private tasks :Task[]= [];


    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(title: string, description: string): Task {
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }

    getById(id:string): Task {
        const found =  this.tasks.find(task => task.id===id)
        if(!found){
            throw new NotFoundException('Such a task with id '+id+' does not exist')
        }
        return found
    }

    deleteTask(id:string): Task {
        const taskToRemove = this.getById(id)
        this.tasks = this.tasks.filter(task => task.id!==id)
        return taskToRemove
        
    }

    updateTaskStatus(id:string,status:TaskStatus) {
        const task = this.getById(id)
        task.status = status
        return task
    }

    getTaskWithFilter(filterDto:getTaskFilter): Task[] {
        const {status,searchTerm } = filterDto
        let tasks = this.getAllTasks()
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
