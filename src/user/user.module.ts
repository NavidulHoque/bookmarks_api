import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './user.providers';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [...usersProviders],
  exports: [...usersProviders],
  controllers: [UserController]
})
export class UserModule {}
