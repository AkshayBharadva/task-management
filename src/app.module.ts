import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TasksModule, DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
