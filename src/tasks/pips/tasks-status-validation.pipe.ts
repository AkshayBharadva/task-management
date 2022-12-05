import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../entities/task.entity';

@Injectable()
export class TasksStatusValidationPipe implements PipeTransform {
  private readonly allowedStaus: string[] = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(metadata);
    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`${value} is an invalid status.`);
    }

    return value;
  }

  private isValidStatus(status: string) {
    status = status.toUpperCase();
    const idx = this.allowedStaus.indexOf(status);
    return idx !== -1;
  }
}
