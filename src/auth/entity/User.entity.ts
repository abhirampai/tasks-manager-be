import { ObjectId } from "mongoose";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('user')
export class User {
    @ObjectIdColumn()
    id:ObjectId

    @Column()
    username:string

    @Column()
    password:string
}