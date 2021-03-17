import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TorNode } from './tor-node.model';
import { TorNodeService } from './tor-node.service';

@Controller('tor-node')
export class TorNodeController {
  constructor(private service: TorNodeService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAll(): Promise<Array<string>> {
    return this.service.getIps();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/filtered')
  async getFiltered(): Promise<Array<string>> {
    return this.service.getIpsOffList();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/exclusion-list')
  async getExclusionList(): Promise<Array<string>> {
    return this.service.getExclusionList();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() torNode: TorNode): Promise<TorNode> {
    return this.service.create(torNode);
  }
}
