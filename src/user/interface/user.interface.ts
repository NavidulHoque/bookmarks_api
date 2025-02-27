import { Document } from 'mongoose';

export interface User extends Document {
  readonly email: string;
  password: string; 
  readonly createdAt: Date;
  updatedAt: Date;
}