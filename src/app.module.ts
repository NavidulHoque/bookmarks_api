/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BookmarkModule,
    UserModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot(), // Loads .env variables
  ],
})
export class AppModule {}
