import { REPOSITORY } from 'src/constants';
import { DataSource } from 'typeorm';
import { Task } from './entities/task.entity';

export const taskProviders = [
  {
    provide: REPOSITORY.TASK,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: [REPOSITORY.DATASOURCE],
  },
];
