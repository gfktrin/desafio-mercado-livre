import { Injectable } from '@nestjs/common';
import { DanWrapper } from 'src/shared/dan-wrapper';

@Injectable()
export class TorNodeService {
  async getIps() {
    const dan = new DanWrapper();
    return dan.getIps();
  }
}
