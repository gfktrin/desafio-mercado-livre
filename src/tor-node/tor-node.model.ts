import { Document } from 'mongoose';
import { Sources } from 'src/shared/enums/sources.enum';

export class TorNode extends Document {
  id: string;
  ip: string;
  updatedAt: Date;
  createdAt: Date;
  source: Sources;
}
