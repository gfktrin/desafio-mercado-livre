import { Document } from 'mongoose';

export class TorNode extends Document {
  id: string;
  ip: string;
}
