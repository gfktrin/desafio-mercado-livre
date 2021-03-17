import { Body, Controller, Get, Post } from '@nestjs/common';
import { TorNode } from './tor-node.model';
import { TorNodeService } from './tor-node.service';

@Controller('tor-node')
export class TorNodeController {
  constructor(private service: TorNodeService) {}

  @Get('/getips')
  async getAll(): Promise<Array<string>> {
    return this.service.getIps();
  }

  @Post()
  async create(@Body() torNode: TorNode): Promise<TorNode> {
    return this.service.create(torNode);
  }
}
