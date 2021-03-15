import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DanWrapper } from 'src/shared/dan-wrapper';
import { TorNode } from './tor-node.model';

@Injectable()
export class TorNodeService {
  constructor(
    @InjectModel('TorNode') private readonly torNodeModel: Model<TorNode>,
  ) {}

  async getIps() {
    const dan = new DanWrapper();
    return dan.getIps();
  }
}
