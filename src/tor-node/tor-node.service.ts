import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DanWrapper } from 'src/shared/dan-wrapper';
import { Sources } from 'src/shared/enums/sources.enum';
import { TorNode } from './tor-node.model';

@Injectable()
export class TorNodeService {
  constructor(
    @InjectModel('TorNode') private readonly torNodeModel: Model<TorNode>,
  ) {}

  async getIps() {
    const dan = new DanWrapper();
    const ipList = await dan.getIps();
    for (const ip of ipList) {
      const torNode = await this.getByIp(ip);
      if (torNode) {
        torNode.updatedAt = new Date();
        torNode.source = Sources.dan;
        await this.torNodeModel.updateOne({ _id: torNode.id }, torNode).exec();
      } else {
        const node = new this.torNodeModel({ ip, source: Sources.dan });
        await node.save();
      }
    }
    return ipList;
  }

  async getByIp(ip: string) {
    return await this.torNodeModel.findOne({ ip }).exec();
  }

  async getById(id: string) {
    return await this.torNodeModel.findById(id).exec();
  }

  async create(torNode: TorNode) {
    const createdNode = new this.torNodeModel(torNode);
    return await createdNode.save();
  }

  async update(id: string, node: TorNode) {
    await this.torNodeModel.updateOne({ _id: id }, node).exec();
    return this.getById(id);
  }
}
