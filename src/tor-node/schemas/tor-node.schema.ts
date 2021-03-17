import * as mongoose from 'mongoose';
import { Sources } from 'src/shared/enums/sources.enum';

export const TorNodeSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  source: { type: Number, enum: Sources },
});

TorNodeSchema.index({ ip: 1, source: 1 }, { unique: true });
