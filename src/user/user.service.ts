import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(doc: User) {
    const result = await new this.userModel(doc).save();
    return result.id;
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }
}
