import { REPOSITORY } from 'src/constants';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const userProviders = [
  {
    provide: REPOSITORY.USER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [REPOSITORY.DATASOURCE],
  },
];
