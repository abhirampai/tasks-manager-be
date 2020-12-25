import { ObjectId } from "mongoose";
import { User } from "src/auth/entity/User.entity";
import { Column, Entity, ManyToOne, ObjectIdColumn } from "typeorm";
import { TaskStatus } from "../models/task-status.enum";

@Entity('task')
export class Task {

    @ObjectIdColumn()
    id:ObjectId;

    @Column()
    title:string;

    @Column()
    description: string;

    @Column()
    status:TaskStatus;

    @ManyToOne(type=> User, user => user.tasks,{eager:false})
    user:User
    
    constructor(task?: Partial<Task>) {
        Object.assign(this, task);
      }
}