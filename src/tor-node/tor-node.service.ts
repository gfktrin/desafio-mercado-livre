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
    const operations = [];
    for (const ip of ipList) {
      operations.push({
        updateOne: {
          filter: { ip: ip },
          update: {
            $set: { updatedAt: new Date() },
            $setOnInsert: { ip, createdAt: new Date() },
          },
          upsert: true,
        },
      });
    }
    await this.torNodeModel.bulkWrite(operations);
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
