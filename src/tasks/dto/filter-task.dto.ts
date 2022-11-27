import { TaskStatus } from '../entities/task.entity';

export class FilterTaskDto {
  search: string;
  status: TaskStatus;
}
