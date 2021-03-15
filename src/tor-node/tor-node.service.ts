import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DanWrapper } from 'src/shared/dan-wrapper';
import { Sources } from 'src/shared/enums/sources.enum';
import { getMinutesBetweenDates } from 'src/shared/time-helpers';
import { TorNode } from './tor-node.model';

@Injectable()
export class TorNodeService {
  constructor(
    @InjectModel('TorNode') private readonly torNodeModel: Model<TorNode>,
  ) {}

  async getIps() {
    const dan = new DanWrapper();
    const lastUpdatedDanNode = await this.torNodeModel
      .find({ source: Sources.dan })
      .sort({ updatedAt: -1 })
      .limit(1);
    let ipList = [];

    if (
      getMinutesBetweenDates(lastUpdatedDanNode[0].updatedAt, new Date()) > 30
    ) {
      ipList = await dan.getIps();
      const operations = [];
      for (const ip of ipList) {
        operations.push({
          updateOne: {
            filter: { ip: ip },
            update: {
              $set: { updatedAt: new Date() },
              $setOnInsert: { ip, createdAt: new Date(), source: Sources.dan },
            },
            upsert: true,
          },
        });
      }
      await this.torNodeModel.bulkWrite(operations);
    }
    // TODO: return last updated ips
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
