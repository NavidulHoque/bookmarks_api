import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...usersProviders],
  exports: [...usersProviders]
})
export class UserModule {}
