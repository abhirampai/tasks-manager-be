import { ObjectId } from "mongoose";
import { Column, Entity, ObjectIdColumn } from "typeorm";
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

    constructor(task?: Partial<Task>) {
        Object.assign(this, task);
      }
}