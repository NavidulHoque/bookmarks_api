/* eslint-disable prettier/prettier */

import { Connection } from 'mongoose';
import { UserSchema } from './schema/user.schema';
import { USER_MODEL } from './constants';

export const usersProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
