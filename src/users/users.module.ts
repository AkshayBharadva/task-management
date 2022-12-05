import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'src/constants';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: JWT.SECRET,
      signOptions: { expiresIn: JWT.EXPIRE_IN },
    }),
  ],
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
})
export class UsersModule {}
