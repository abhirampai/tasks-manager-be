import { EntityRepository, Repository } from "typeorm";
import { Task } from "./entity/Task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
}