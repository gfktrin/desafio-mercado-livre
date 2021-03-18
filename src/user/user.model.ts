import { Document } from 'mongoose';

export interface User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  validatePassword(password: string): boolean;
}
