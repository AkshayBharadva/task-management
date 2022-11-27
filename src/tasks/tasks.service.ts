import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findAllByFilter(filterTaskDto: FilterTaskDto): Task[] {
    let tasks = this.findAll();
    const { search, status } = filterTaskDto;

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return tasks;
  }

  findOne(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }

    return task;
  }

  update(id: string, status: TaskStatus): Task {
    const task = this.findOne(id);
    task.status = status;
    return task;
  }

  remove(id: string) {
    const found = this.findOne(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }
}
