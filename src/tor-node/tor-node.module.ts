import { Module } from '@nestjs/common';
import { TorNodeService } from './tor-node.service';
import { TorNodeController } from './tor-node.controller';

@Module({
  providers: [TorNodeService],
  controllers: [TorNodeController]
})
export class TorNodeModule {}
