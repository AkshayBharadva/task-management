import { TaskStatus } from '../entities/task.entity';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class FilterTaskDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;
}
