import * as mongoose from 'mongoose';
import { Sources } from 'src/shared/enums/sources.enum';

export const UserSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  updatedAt: { type: Date, default: Date.now, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  source: { type: Number, enum: Sources },
});
