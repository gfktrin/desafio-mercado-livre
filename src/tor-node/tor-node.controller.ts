import { Body, Controller, Get, Post } from '@nestjs/common';
import { TorNode } from './tor-node.model';
import { TorNodeService } from './tor-node.service';

@Controller('tor-node')
export class TorNodeController {
  constructor(private service: TorNodeService) {}

  @Get('/')
  async getAll(): Promise<Array<string>> {
    return this.service.getIps();
  }

  @Get('/filtered')
  async getFiltered(): Promise<Array<string>> {
    return this.service.getIpsOffList();
  }

  @Get('/exclusion-list')
  async getExclusionList(): Promise<Array<string>> {
    return this.service.getExclusionList();
  }

  @Post('/')
  async create(@Body() torNode: TorNode): Promise<TorNode> {
    return this.service.create(torNode);
  }
}
