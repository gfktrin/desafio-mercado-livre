import { Document } from 'mongoose';

export class User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
}
