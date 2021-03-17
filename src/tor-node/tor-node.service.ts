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

  async fetchAndSave() {
    const dan = new DanWrapper();
    const ipList = await dan.getIps();
    const operations = [];
    for (const ip of ipList) {
      operations.push({
        updateOne: {
          filter: { ip: ip, source: Sources.dan },
          update: {
            $set: { updatedAt: new Date() },
            $setOnInsert: { ip, createdAt: new Date(), source: Sources.dan },
          },
          upsert: true,
        },
      });
    }
    await this.torNodeModel.bulkWrite(operations);
    return ipList;
  }

  async getIps() {
    const lastUpdatedDanNode = await this.torNodeModel
      .find({ source: Sources.dan })
      .sort({ updatedAt: -1 })
      .limit(1);
    const fetchTimeLimit = lastUpdatedDanNode.length
      ? getMinutesBetweenDates(lastUpdatedDanNode[0].updatedAt, new Date()) > 30
      : false;
    let ipList = [];

    if (!lastUpdatedDanNode.length || fetchTimeLimit) {
      ipList = await this.fetchAndSave();
    } else {
      const fetchedNodes = await this.torNodeModel.find(
        {
          updatedAt: {
            $gte: new Date(
              lastUpdatedDanNode[0].updatedAt.getTime() - 2000 * 60,
            ),
            $lt: lastUpdatedDanNode[0].updatedAt,
          },
          source: Sources.dan,
        },
        { ip: 1, _id: 0 },
      );

      ipList = fetchedNodes.map((node) => node.ip);
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
    createdNode.source = Sources.user;
    return await createdNode.save();
  }

  async update(id: string, node: TorNode) {
    await this.torNodeModel.updateOne({ _id: id }, node).exec();
    return this.getById(id);
  }
}
