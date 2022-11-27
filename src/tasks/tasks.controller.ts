import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { TasksStatusValidationPipe } from './pips/tasks-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query(ValidationPipe) filterTaskDto: FilterTaskDto): Task[] {
    if (Object.keys(filterTaskDto).length) {
      return this.tasksService.findAllByFilter(filterTaskDto);
    } else {
      return this.tasksService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task {
    return this.tasksService.findOne(id);
  }

  @Patch(':id/status')
  update(
    @Param('id') id: string,
    @Body('status', TasksStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.update(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.tasksService.remove(id);
  }
}
