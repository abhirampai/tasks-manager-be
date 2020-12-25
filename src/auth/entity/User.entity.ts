import { ObjectId } from "mongoose";
import { Task } from "src/tasks/entity/Task.entity";
import { Column, Entity, ObjectIdColumn, OneToMany } from "typeorm";

@Entity('user')
export class User {
    @ObjectIdColumn()
    id:ObjectId

    @Column()
    username:string

    @Column()
    password:string

    @OneToMany(type=> Task, task=> task.user,{eager: true})
    tasks:Task[]
}