import { REPOSITORY } from 'src/constants';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: REPOSITORY.DATASOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'taskmanagment',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
      });

      return dataSource.initialize();
    },
  },
];
