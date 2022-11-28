import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await this.taskRepository.save(task);

    return task;
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findAllByFilter(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    let tasks: Task[];
    const { search, status } = filterTaskDto;

    tasks = await this.taskRepository.findBy({
      title: search,
      description: search,
      status,
    });

    return tasks;
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({
      id,
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }

    return task;
  }

  async update(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.findOne(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async remove(id: number): Promise<Task | void> {
    const found = await this.findOne(id);
    return await this.taskRepository.remove(found);
  }
}
